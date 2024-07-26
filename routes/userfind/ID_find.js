const express = require('express');
const router = express.Router();
const ID_findService = require('../../services/userfind/ID_findService');
const scrollBlocker = require('../../middlewares/scrollBlocker');

// 아이디 찾기 페이지 렌더링
router.get('/ID_find',scrollBlocker, ID_findService.ID_find);
router.post('/ID_find',scrollBlocker, ID_findService.sendCode);
router.post('/verify', scrollBlocker, ID_findService.verifyCode);

module.exports = router;
