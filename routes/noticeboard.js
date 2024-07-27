const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const noticeboardService = require('../services/noticeboardService');

router.get('/noticeboard', noticeboardService.getNoticeboard);

// GET 요청: 게시글 작성 폼을 렌더링
router.get('/noticeboard/form', (req, res) => {
    res.render('noticeboard/form'); // 작성 폼 렌더링
});

// POST 요청: 새 게시글을 데이터베이스에 저장
router.post('/form', noticeboardService.createPost);

module.exports = router;
