var express = require('express');
var router = express.Router();

const {patientList, createPatient, updatePatient} = require('../controllers/patientController')


router.get('/',patientList);
router.post('/', createPatient);
router.put('/', updatePatient);

module.exports = router;