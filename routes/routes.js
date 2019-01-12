var express = require('express')
var router = express.Router()
var tokenVerify = require('./tokenVerify')

var registrationLogin = require('./registrationLogin')
router.post('/register', registrationLogin.registration)
router.post('/login', registrationLogin.login)

var contacts = require('./contact')
router.post('/addContact', tokenVerify, contacts.addContact)
router.get('/showAll', tokenVerify, contacts.showContacts)

module.exports = router;