var express = require('express');
var router = express.Router();

const {studentFindings} = require('../controllers/studentFindingsController')


router.get('/',studentFindings);

module.exports = router;