//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import database (khi nào cần connect database nào thì gọi cái phù hợp)
const mysql = require('mysql2')
const mongo = require('mongoose')
const { HmacSHA224 } = require('crypto-js')

//Khởi tạo tham số router và cấp quyền CORS
const router = express.Router()
router.use(cors())
router.use(express.json())

// Sử dụng kỹ thuật pooling để tạo tối đa 10 connection đến mysql
// Các connection sẽ được luân phiên sử dụng.
// Hạn chế việc connect liên tục đến database, đảm bảo hiệu suất ctrinh
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'truong050123',
  database: 'projectelearning',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Define user-related routes
router.post('/login', (req, res) =>
{
  const { username, pass, role } = req.body
  pool.getConnection((err, connection) =>
  {
    if (err) throw err

    let query = 'SELECT userID, activity_status from account WHERE username = ? AND password = ?'
    connection.query(query, [username, pass], (error, results) => {
      connection.release()
      if (error) throw error
      if (results.length > 0) {
        if (role==='Admin' && results[0].userID[0]==='A')
          res.send( results )
        else if (role==='Student' && results[0].userID[0]==='S')
          res.send( results )
        else if (role==='Instructor' && results[0].userID[0]==='I')
          res.send( results )
        else
          res.send('User are not existed')
      }
      else
        res.send('User are not existed')
    })
  })
})

router.post('/signup', (req, res) => {
  const session = req.session
})
// Export the router
module.exports = router