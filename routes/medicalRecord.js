var express = require('express');
var router = express.Router();

const {medicalRec} = require('../controllers/medicalRecController')


router.get('/',medicalRec);

module.exports = router;