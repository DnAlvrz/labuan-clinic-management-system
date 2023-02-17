var express = require('express');
var router = express.Router();

const {medicalRec, medicalForm} = require('../controllers/medicalRecController')


router.get('/',medicalRec);
router.get('/form', medicalForm);

module.exports = router;