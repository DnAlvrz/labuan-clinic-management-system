var express = require('express');
var router = express.Router();

const {visitor} = require('../controllers/visitorController')


router.get('/',visitor);

module.exports = router;