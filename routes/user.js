const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/createuser', (req, res) => {
  res.render('createuser');
});

router.post('/createuser', userService.createUser);


module.exports = router;
