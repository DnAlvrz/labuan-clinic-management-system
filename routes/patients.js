var express = require('express');
var router = express.Router();

const {patient} = require('../controllers/patientController')


router.get('/',patient);

module.exports = router;