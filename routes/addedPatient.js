var express = require('express');
var router = express.Router();

const {addedPatient,} = require('../controllers/addedPatientController')


router.get('/',addedPatient);

module.exports = router;