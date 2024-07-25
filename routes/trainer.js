const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const trainerService = require('../services/trainerService');

router.get('/trainers', isAuthenticated, trainerService.getTrainers);

module.exports = router;
