const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const noticeboardService = require('../services/noticeboardService');

router.get('/noticeboard', noticeboardService.getNoticeboard);

module.exports = router;
