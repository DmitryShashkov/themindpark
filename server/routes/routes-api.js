const router = require('express').Router();

const api = new (require('../controllers/api'))();

router.post('/api/contacts', api.addContact);

module.exports = router;