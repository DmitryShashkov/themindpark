const config = require('./config/config');
const maintain = new (require('./server/controllers/maintain'))();

const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const router = require('./server/routes');
const http = require('http');
const winston = require('winston');

const express = require('express');
const app = express();

app.use(compression());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(favicon(path.join(__dirname, config.server.staticDir, 'favicon.ico')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, config.server.staticDir)));

if (config.server.useAuth) {
    app.use(maintain.customAuth);
}

app.use(router);

let server = http.createServer(app);
let port = config.server.port;

server.listen(port);

winston.log('info', 'Listening on port ' + port);