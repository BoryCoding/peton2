// express 모듈을 불러오고 라우터를 만듭니다.
const express = require('express');
const router = express.Router();

// 강아지 백과사전 데이터를 정의합니다.
const dogData = [
  { name: "Golden Retriever", image: "/images/golden_retriever.jpg" },
  { name: "Labrador Retriever", image: "/images/labrador_retriever.jpg" },
  { name: "German Shepherd", image: "/images/german_shepherd.jpg" },
];

// "/dogencyclopedia" 경로로 요청이 들어오면 실행됩니다.
router.get('/dogencyclopedia', (req, res) => {
  // "dogencyclopedia.ejs" 템플릿 파일을 렌더링하고 dogData를 넘겨줍니다.
  res.render('dogencyclopedia', { dogEncyclopedias: dogData });
});

// 라우터를 내보냅니다.
module.exports = router;
