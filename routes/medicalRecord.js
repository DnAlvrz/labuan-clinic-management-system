var express = require('express');
var router = express.Router();

const {medicalRec, medicalForm, newMedicalRecord, editMedicalRecord}  = require('../controllers/medicalRecController')


router.get('/',medicalRec);
router.post('/', newMedicalRecord);
router.put('/', editMedicalRecord);
router.get('/form', medicalForm);

module.exports = router;