var express = require('express');
var router = express.Router();

const {student, newStudent, studentForm, studentFindings, studentRecord} = require('../controllers/studentController')


router.get('/',student);
router.post('/',newStudent);
router.get('/form',studentForm);
router.get('/findings',studentFindings);
router.get('/record',studentRecord);

module.exports = router;