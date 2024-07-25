const express = require('express');
const router = express.Router();
const PW_findService = require('../../services/userfind/PW_findService');

// 비밀번호 찾기 페이지 렌더링
router.get('/PW_find', PW_findService.PW_find);

// 비밀번호 찾기 처리 (이메일 입력 및 코드 전송)
router.post('/PW_find', PW_findService.sendCode);

// 코드 검증 및 비밀번호 업데이트
router.post('/verifyPW', PW_findService.verifyCode);

router.post('/redirection', PW_findService.redirection);

module.exports = router;
