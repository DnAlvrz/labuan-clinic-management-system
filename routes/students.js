var express = require('express');
var router = express.Router();

const {studentList, updateStudent,newStudent, studentForm, studentFindings, studentRecord, deleteStudent} = require('../controllers/studentController')


router.get('/',studentList);
router.post('/',newStudent);
router.put('/', updateStudent);
router.delete('/', deleteStudent)
router.get('/form',studentForm);
router.get('/findings',studentFindings);
router.get('/record',studentRecord);

module.exports = router;