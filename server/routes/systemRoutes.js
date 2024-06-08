//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import database (khi nào cần connect database nào thì gọi cái phù hợp)
const mysql = require('mysql2')
const mongo = require('mongoose')

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
  password: 'root',
  database: 'projectelearning',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Define user-related routes
router.post('/login', (req, res) =>
{
  const { username, pass, role } = req.body
  let roleOfUser = ''
  if (role === 'Admin')
    roleOfUser = 'A'
  else if (role === 'Student')
    roleOfUser = 'S'
  else if (role === 'Instructor')
    roleOfUser = 'I'

  pool.getConnection((err, connection) =>
  {
    if (err) throw err

    let query = 'SELECT userID, activity_status from account WHERE username = ? AND password = ? AND LEFT(userID,1) = ?'
    connection.query(query, [username, pass, roleOfUser], (error, results) => {
      connection.release()
      if (error) throw error
      if (results.length > 0) {
        req.session.userID = results[0].userID
        res.send( results )
      }
      else
        res.send('User are not existed')
    })
  })
})

// Export the router
module.exports = router