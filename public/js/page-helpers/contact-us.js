var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var invalidClass = 'invalid';
var visibleClass = 'popup-visible';

function highlightInvalid (element) {
    if (!element.classList.contains(invalidClass)) {
        element.classList.add(invalidClass);
        setTimeout(function () {
            element.classList.remove(invalidClass);
        }, 1000);
    }
}

function clearInputs (inputs) {
    Object.keys(inputs).forEach(function (key) {
        inputs[key].value = '';
    })
}

document.addEventListener('DOMContentLoaded', function () {
    var inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        details: document.getElementById('more-info'),
    };

    var submitButton = document.getElementById('btn-submit');

    var popup = document.getElementById('popup-contact');
    var closeCross = document.getElementById('close-cross');


    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        var data = {};
        var isDataValid = true;
        var xhr = new XMLHttpRequest();

        Object.keys(inputs).forEach(function (key) {
            data[key] = inputs[key].value;
        });

        if (!data.name) {
            isDataValid = false;
            highlightInvalid(inputs.name);
        }

        if (!emailRegExp.test(data.email)) {
            isDataValid = false;
            highlightInvalid(inputs.email)
        }

        if (!data.details) {
            isDataValid = false;
            highlightInvalid(inputs.details);
        }

        if (!isDataValid) { return; }

        xhr.open('POST', '/api/contacts', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                popup.classList.add(visibleClass);
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(data));

        clearInputs(inputs);
    });

    closeCross.addEventListener('click', function () {
        popup.classList.remove(visibleClass);
    });
});