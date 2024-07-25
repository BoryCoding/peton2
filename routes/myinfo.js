const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const myinfoService = require('../services/myinfoService');

router.get('/myinfo', isAuthenticated, myinfoService.getMyInfo);
router.post('/updatemyinfo', isAuthenticated, myinfoService.updateMyInfo);
router.get('/addpet', isAuthenticated, myinfoService.renderaddpet);
router.post('/addpet', isAuthenticated, myinfoService.addpet);
router.get('/mypets', isAuthenticated, myinfoService.addpets);

module.exports = router;
