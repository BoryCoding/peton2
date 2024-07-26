function scrollBlocker(req, res, next) {
  // HTML에서 스크롤 방지를 위한 스타일을 추가합니다.
  res.locals.disableScrollScript = `
    <style>
      body {
        overflow: hidden;
      }
    </style>
  `;
  next();
}

module.exports = scrollBlocker;
