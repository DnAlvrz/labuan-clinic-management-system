var express = require('express');
var router = express.Router();

const {index, dashboard} = require('../controllers/indexController')

/* GET home page. */
router.get('/',index);
router.get('/dashboard',dashboard);

module.exports = router;
