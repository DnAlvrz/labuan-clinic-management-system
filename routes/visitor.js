var express = require('express');
var router = express.Router();

const {visitorList, visitorForm} = require('../controllers/visitorController')


router.get('/',visitorList);
router.get('/form',visitorForm);

module.exports = router;