var express = require('express');
var router = express.Router();

const {student} = require('../controllers/studentController')


router.get('/',student);

module.exports = router;