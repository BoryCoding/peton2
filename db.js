const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'gg696923!!',
  database: 'peton'
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 데이터베이스 연결 실패: ", err);
    process.exit(1);
  }
  console.log("MySQL 데이터베이스에 연결되었습니다");
});

module.exports = db;
