var express = require('express');
var router = express.Router();

const {visitorList, deleteVisitor} = require('../controllers/visitorController')


router.get('/',visitorList);
router.delete('/',deleteVisitor);

module.exports = router;