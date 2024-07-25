const db = require('../../db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// 비밀번호 찾기 페이지 렌더링
exports.PW_find = (req, res) => {
    console.log('Rendering PW_find page!!');
    res.render('userfind/PW_find', { email: null, passwordUpdated: null });
};

// 이메일로 코드 전송
exports.sendCode = (req, res) => {
    const { email } = req.body;
    console.log('Received email for verification:', email);

    db.query('SELECT login_id FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('서버 오류가 발생했습니다.');
        }

        if (results.length === 0) {
            console.log('Email not found in database');
            return res.status(404).send('이메일이 존재하지 않습니다.');
        }

        const code = crypto.randomBytes(3).toString('hex');
        console.log('Generated verification code:', code);

        req.session.email = email;
        req.session.code = code;
        console.log('Stored email and code in session:', req.session);

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'tkaqkrrhf11@gmail.com',
                pass: 'ldcw khts jmbi yvhl'
            }
        });

        const mailOptions = {
            from: 'tkaqkrrhf11@gmail.com',
            to: email,
            subject: '이메일 인증 코드',
            text: `이메일 인증 코드: ${code}`
        };

        console.log('Sending email with options:', mailOptions);
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).send('이메일 전송 오류가 발생했습니다.');
            }
            console.log('Email sent successfully:', info.response);
            res.render('userfind/PW_find', { email: email, passwordUpdated: null });
        });
    });
};

// 인증 코드 검증 및 비밀번호 업데이트
exports.verifyCode = (req, res) => {
    const { email, code, newPassword, confirmPassword } = req.body;
    console.log('Received email, code, and passwords for verification:', email, code, newPassword, confirmPassword);

    if (req.session.code !== code) {
        console.log('Verification failed: code mismatch');
        return res.status(400).send('인증 코드가 올바르지 않습니다.');
    }

    if (newPassword !== confirmPassword) {
        console.log('Password mismatch');
        return res.status(400).send('비밀번호가 일치하지 않습니다.');
    }

    // 해시 및 솔트 생성
    const saltRounds = 10;
    bcrypt.hash(newPassword, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('서버 오류가 발생했습니다.');
        }

        db.query('UPDATE user SET password = ? WHERE email = ?', [hash, email], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send('서버 오류가 발생했습니다.');
            }

            console.log('Password updated successfully for user:', email);
            res.render('userfind/PW_find', { email: null, passwordUpdated: true });
        });
    });

};

exports.redirection = (req, res) => {
    console.log('Redirecting to login page!!');
    res.redirect('/login');

}

