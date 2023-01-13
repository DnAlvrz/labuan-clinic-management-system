var express = require('express');
var router = express.Router();

const {studentList} = require('../controllers/studentController')


router.get('/',studentList);

module.exports = router;