const db = require('../../db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// 아이디 찾기 페이지 렌더링
exports.ID_find = (req, res) => {
    console.log('Rendering ID_find page!!');
    res.render('userfind/ID_find', { email: null, login_id: null });
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
            res.render('userfind/ID_find', { email: email, login_id: null });
        });
    });
};

// 인증 코드 검증 및 아이디 출력
exports.verifyCode = (req, res) => {
    const { email, code } = req.body;
    console.log('Received email and code for verification:', email, code);

    if (req.session.code !== code) {
        console.log('Verification failed: code mismatch');
        return res.status(400).send('인증 코드가 올바르지 않습니다.');
    }

    db.query('SELECT login_id FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('서버 오류가 발생했습니다.');
        }

        console.log('Database query result:', results);

        if (results.length === 0) {
            console.log('No user found with this email');
            return res.status(404).send('사용자를 찾을 수 없습니다.');
        }

        const login_id = results[0].login_id;
        console.log('User login_id:', login_id);
        res.render('userfind/ID_find', { email: null, login_id: login_id });
    });
};
