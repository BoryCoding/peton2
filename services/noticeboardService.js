const db = require('../db');

exports.getNoticeboard = (req, res) => {
  db.query('SELECT * FROM noticeboard', (err, results) => {
    if (err) {
      console.error("게시판 조회 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.render('noticeboard', { noticeboard: results });
  });
};
