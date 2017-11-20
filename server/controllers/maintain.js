const config = require('./../../config/config');

const winston = require('winston');

class MaintainController {
    constructor () {}

    // noinspection JSMethodCanBeStatic
    process404 (req, res) {
        winston.log('warn', 'Cannot ' + req.method.toLowerCase() + ' ' + req.url);

        // render 404 page
        res.sendStatus(404);
    }

    // noinspection JSMethodCanBeStatic
    process500 (err, req, res, next) {
        winston.log('error', err);

        // if it was request for a page, and error has occured while rendering it,
        // user will receive 404 page instead; other controllers, however, may send back their own errors:
        // in this case 'render' will cause 'Can't set headers after they are sent' error
        if (!res.headersSent) {
            res.sendStatus(404);
        }
    }

    // noinspection JSMethodCanBeStatic
    customAuth (req, res, next) {
        // Grab the "Authorization" header.
        let auth = req.get('authorization');

        // On the first request, the "Authorization" header won't exist, so we'll set a Response
        // header that prompts the browser to ask for a username and password.
        if (!auth) {
            res.set('WWW-Authenticate', 'Basic realm=\"Authorization Required\"');
            // If the user cancels the dialog, or enters the password wrong too many times,
            // show the Access Restricted error message.
            return res.status(401).send('Authorization Required');
        } else {
            // If the user enters a username and password, the browser re-requests the route
            // and includes a Base64 string of those credentials.
            let credentials = new Buffer(auth.split(' ').pop(), 'base64').toString('ascii').split(':');

            if ((credentials[0] === config.testAuth.user && credentials[1] === config.testAuth.password) ||
                (auth.indexOf('admin') !== -1)) {
                // The username and password are correct, so the user is authorized
                // (or we are trying to authorize in admin panel)
                return next();
            } else {
                // The user typed in the username or password wrong.
                return res.status(403).send('Access Denied (incorrect credentials)');
            }
        }
    }
}

module.exports = MaintainController;