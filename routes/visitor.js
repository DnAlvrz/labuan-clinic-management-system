var express = require('express');
var router = express.Router();

const {visitor, visitorForm} = require('../controllers/visitorController')


router.get('/',visitor);
router.get('/form',visitorForm);

module.exports = router;