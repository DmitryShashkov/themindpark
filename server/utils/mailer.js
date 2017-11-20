let config = require('./../../config/config');
let nodemailer = require('nodemailer');
let winston = require('winston');

let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: config.emails.sender
};

let transporter = nodemailer.createTransport(smtpConfig);

/**
 * Send e-mail with received options
 * @name module.exports.sendEmail
 * @param {Object} mailOptions - Object with options.
 * @param {string|string[]} mailOptions.to - Recipient(s) e-mail address(es).
 * @param {string} [mailOptions.subject] - E-mail subject.
 * @param {string} [mailOptions.text] - The plaintext version of the message.
 * @param {string} [mailOptions.html] - The HTML version of the message.
 * @param {Object[]} [mailOptions.attachments] - Array of attachments objects (providing filename and path).
 * @returns {Promise}
 */
function sendEmail (mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info){
            if (error) {
                winston.log('error', error);
                reject(error);
            }
            winston.log('info', 'Message sent: ' + info.response);
            resolve();
        });
    });
}

module.exports = {
    sendEmail: sendEmail
};
