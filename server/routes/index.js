const CORS = require('cors');

const app = require('express').Router();

app.use(CORS());

const maintain = new (require('../controllers/maintain'))();

app.use(require('./routes-api'));

app.use(maintain.process404);
app.use(maintain.process500);

module.exports = app;
