var express = require('express');
var router = express.Router();

const {patientList, createPatient} = require('../controllers/patientController')


router.get('/',patientList);
router.post('/', createPatient);

module.exports = router;