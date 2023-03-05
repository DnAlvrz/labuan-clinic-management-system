const router = require('express').Router();
const {viewStudent,searchPatient, searchStudent} = require('../controllers/api')

router.get('/students/profile/:studentId', viewStudent);
router.get('/students/search/:studentId', searchStudent);
router.get('/patients/:patientId', viewStudent);

module.exports = router