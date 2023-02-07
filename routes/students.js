var express = require('express');
var router = express.Router();

const {student, newStudent, studentForm, studentFindings} = require('../controllers/studentController')


router.get('/',student);
router.post('/',newStudent);
router.get('/form',studentForm);
router.get('/findings',studentFindings);

module.exports = router;