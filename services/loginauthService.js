const db = require('../db');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { login_id, password, rememberMe} = req.body;
  const query = 'SELECT * FROM user WHERE login_id = ?';

  db.query(query, [login_id], async (err, results) => {
    if (err) {
      console.error("로그인 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }

    if (results.length === 0) {
      console.log("로그인 실패: 아이디 또는 패스워드가 틀렸습니다.");
      res.send('<script>alert("아이디 또는 패스워드가 틀렸습니다."); window.location.href = "/login";</script>');
      return;
    }

    const user = results[0];
    
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("로그인 실패: 아이디 또는 패스워드가 틀렸습니다.");
        res.send('<script>alert("아이디 또는 패스워드가 틀렸습니다."); window.location.href = "/login";</script>');
        return;
      }

      req.session.userid = user.user_id; // 세션에 user_id 저장
      req.session.login_id = login_id;

      if (rememberMe) {
        console.log(rememberMe, '시발 !!');
        res.cookie('rememberMe', login_id, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30일 동안 쿠키 저장
      } else {
        res.clearCookie('rememberMe');
      }

      console.log("로그인 성공");
      res.send('<script>alert("로그인 성공."); window.location.href = "/";</script>');
    } catch (error) {
      console.error("비밀번호 비교 중 에러 발생: ", error);
      res.status(500).send('서버 에러');
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("로그아웃 중 에러 발생: ", err);
      res.status(500).send('서버 에러');
      return;
    }
    res.redirect('/');
  });
};