const express = require('express');
const router = express.Router();
const loginauthService = require('../services/loginauthService');
const sessionremember = require('../middlewares/sessionremember');

router.get('/', (req, res) => {
  res.render('home', { login_id: req.session.login_id });
});

router.get('/login', sessionremember, (req, res) => {
  const rememberMe = req.cookies.rememberMe ? true : false;
  res.render('login', { login_id: req.cookies.rememberMe || '', rememberMe });
});

router.post('/login', loginauthService.login);
router.get('/logout', loginauthService.logout);

module.exports = router;
