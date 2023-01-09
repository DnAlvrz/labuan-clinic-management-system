var express = require('express');
var router = express.Router();

const {loginUser} = require('../controllers/indexController')

/* GET home page. */
router.get('/login',loginUser);

module.exports = router;
