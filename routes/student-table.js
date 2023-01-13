var express = require('express');
var router = express.Router();

const {studentTable} = require('../controllers/indexController')

/* GET home page. */
router.get('/student-table',studentTable);

module.exports = router;