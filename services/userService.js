const nodemailer = require('nodemailer');
const crypto = require('crypto');
const db = require('../db');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { login_id, nick_name, password, confirm_password, user_intro, pw_find, email } = req.body;

  if (password !== confirm_password) {
    return res.send('<script>alert("비밀번호가 일치하지 않습니다."); window.history.back();</script>');
  }

  if (!req.session.EmailCheck || req.session.email !== email) {
    return res.send('<script>alert("이메일 인증이 필요합니다."); window.history.back();</script>');
  }

  const checkQuery = 'SELECT COUNT(*) AS count FROM user WHERE login_id = ?';
  db.query(checkQuery, [login_id], async (err, results) => {
    if (err) {
      console.error("아이디 중복 확인 중 에러 발생: ", err);
      return res.send('<script>alert("서버 에러가 발생했습니다. 다시 시도해 주세요."); window.history.back();</script>');
    }
    if (results[0].count > 0) {
      return res.send('<script>alert("이미 아이디가 사용 중입니다."); window.history.back();</script>');
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const Password = await bcrypt.hash(password, salt);

      const query = 'INSERT INTO user (login_id, nick_name, password, user_intro, pw_find, email, create_time) VALUES (?, ?, ?, ?, ?, ?, NOW())';
      db.query(query, [login_id, nick_name, Password, user_intro, pw_find, email], (err, result) => {
        if (err) {
          console.error("회원가입 중 에러 발생: ", err);
          return res.send('<script>alert("서버 에러가 발생했습니다. 다시 시도해 주세요."); window.history.back();</script>');
        }

        req.session.email = null;
        req.session.EmailCheck = false;

        res.send('<script>alert("회원가입이 완료되었습니다."); window.location.href = "/login";</script>');
      });
    } catch (error) {
      console.error("비밀번호 해싱 중 에러 발생: ", error);
      res.send('<script>alert("서버 에러가 발생했습니다. 다시 시도해 주세요."); window.history.back();</script>');
    }
  });
};
