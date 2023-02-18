const router = require('express').Router();
const {printStudentMedicalRecord} = require('../controllers/printController');

router.get('/students/medical/:studentId', printStudentMedicalRecord);


module.exports = router;