const config = require('../../config/config');
const mailer = require('../utils/mailer');
const templater = require('../utils/templater');

class APIController {
    constructor () {}

    addContact (req, res) {
        mailer.sendEmail({
            to: config.emails.forContacts,
            subject: 'New contact',
            html: templater.produce('emails/new-contact.ejs', req.body)
        });

        return res.send({
            status: 'ok'
        });
    }
}

module.exports = APIController;