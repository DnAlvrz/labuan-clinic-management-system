var express = require('express');
var router = express.Router();

const {visitorList, deleteVisitor, newVisitor} = require('../controllers/visitorController')



router.get('/',visitorList);
router.post('/',newVisitor);
router.delete('/',deleteVisitor);

module.exports = router;