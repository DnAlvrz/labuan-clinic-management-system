var express = require('express');
var router = express.Router();

const {student, newStudent} = require('../controllers/studentController')


router.get('/',student);
router.post('/',newStudent);

module.exports = router;