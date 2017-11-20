let fs = require('fs');
let path = require('path');
let ejs = require('ejs');

/**
 * Produce the HTML out of template
 * @param {string} templateName - Name of template (with extension) within 'views' directory
 * @param {Object} options - Map of values to be replaced
 */
function produce (templateName, options) {
    let fileName = path.join(__dirname, './../../views', templateName);
    let file = fs.readFileSync(fileName).toString();

    // to support 'include' with relative paths
    // inside the rendering template
    options['filename'] = fileName;

    return ejs.render(file, options);
}

module.exports = {
    produce: produce
};
