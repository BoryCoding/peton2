const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const myinfoService = require('../services/myinfoService');

router.get('/myinfo', isAuthenticated, myinfoService.getMyInfo);
router.post('/updatemyinfo', isAuthenticated, myinfoService.updateMyInfo);
router.get('/addpet', isAuthenticated, myinfoService.renderaddpet);
router.post('/addpet', isAuthenticated, myinfoService.updateaddpet);
router.get('/mypets', isAuthenticated, myinfoService.mypets);

router.get('/pet/:pet_id', isAuthenticated, myinfoService.petdetail);
router.post('/pet/:pet_id', isAuthenticated, myinfoService.updatepetdetail);
module.exports = router;
