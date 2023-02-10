var express = require('express');
var router = express.Router();

const {studentList, updateStudent,newStudent, studentForm, studentFindings, studentRecord} = require('../controllers/studentController')


router.get('/',studentList);
router.post('/',newStudent);
router.put('/', updateStudent)
router.get('/form',studentForm);
router.get('/findings',studentFindings);
router.get('/record',studentRecord);

module.exports = router;