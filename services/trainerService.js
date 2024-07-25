const db = require('../db');

exports.getTrainers = (req, res) => {
  db.query('SELECT * FROM Trainer', (err, results) => {
    if (err) {
      console.error("트레이너 조회 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.render('trainer', { trainers: results });
  });
};


