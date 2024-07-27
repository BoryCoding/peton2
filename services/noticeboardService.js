const db = require('../db');

exports.getNoticeboard = (req, res) => {
  db.query('SELECT * FROM noticeboard', (err, results) => {
    if (err) {
      console.error("게시판 조회 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.render('noticeboard/list', { noticeboard: results });
  });
};

// 게시글을 생성하는 서비스 함수
exports.createPost = (req, res) => {
  const { title, description } = req.body;
  const login_id = req.session.login_id;
  console.log(login_id);
  db.query('INSERT INTO noticeboard (nick_name, title, description, user_id, write_time, update_time) VALUES ((SELECT nick_name from user where login_id =?), ?, ?, (SELECT user_id FROM user WHERE login_id = ?), NOW(), NOW())',
      [login_id, title, description,  login_id], (err, result) => {
      if (err) {
          console.error('게시글 생성 중 에러 발생:', err);
          return res.status(500).send('서버 에러');
      }
      res.redirect('/noticeboard');
  });
};