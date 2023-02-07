var express = require('express');
var router = express.Router();

const {studentForm} = require('../controllers/studentFormController')


router.get('/',studentForm);

module.exports = router;