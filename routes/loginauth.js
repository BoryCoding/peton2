const express = require('express');
const router = express.Router();
const loginauthService = require('../services/loginauthService');

router.get('/', (req, res) => {
  res.render('home', { login_id: req.session.login_id });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', loginauthService.login);
router.get('/logout', loginauthService.logout);

module.exports = router;
