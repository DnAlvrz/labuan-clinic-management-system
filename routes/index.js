const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {index, dashboard, visitorForm, newVisitor} = require('../controllers/indexController')

/* GET home page. */
router.get('/', auth.checkisNotAuth, index);
router.get('/visit', auth.checkisNotAuth, visitorForm);
router.post('/', auth.checkisNotAuth, newVisitor);
router.get('/dashboard', auth.checkAuth, dashboard);

module.exports = router;
