const mysql = require('mysql2')
// Sử dụng kỹ thuật pooling để tạo tối đa 10 connection đến mysql
// Các connection sẽ được luân phiên sử dụng.
// Hạn chế việc connect liên tục đến database, đảm bảo hiệu suất ctrinh

const connectMysql = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root', //truong050123 //root
  database: 'projectelearning',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = connectMysql