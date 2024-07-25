const express = require('express');
const router = express.Router();
const ID_findService = require('../../services/userfind/ID_findService');

// 아이디 찾기 페이지 렌더링
router.get('/ID_find', ID_findService.ID_find);
router.post('/ID_find', ID_findService.sendCode);
router.post('/verify', ID_findService.verifyCode);

module.exports = router;
