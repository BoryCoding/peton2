const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tkaqkrrhf11@gmail.com',
        pass: 'ldcw khts jmbi yvhl',
    },
});

const mailOptions = {
    from: 'tkaqkrrhf11@gmail.com',
    to: 'tkaqkrrhf11@gmail.com',
    subject: '이메일 인증 요청',
    text: `이메일 인증을 완료하려면 다음 링크를 클릭하세요: "hello nodemailer"`,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('이메일 발송 중 에러 발생: ', error);
    }
    console.log('이메일 발송 성공: ', info.response);
});