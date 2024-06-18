//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import verifyToken fuction
const { verifyToken } = require('../authenticate')

//import database (khi nào cần connect database nào thì gọi cái phù hợp)
const connMysql = require('../connMySql')

//Khởi tạo tham số router và cấp quyền CORS
const router = express.Router()
router.use(cors())
router.use(express.json())

// Define user-related routes
router.get('/loadInformation', verifyToken, (req, res) => {
  connMysql.getConnection((err, connection) => {
    if (err) {
      res.status(500).send(err)
    }
    //Get information from mysql
    let query = 'SELECT userID, avatar, fullname, date_of_birth, street, province, country, language\
                 from user where userID = ?'
    connection.query(query, [req.userID], async (error, infor) => {
      connection.release() //Giải phóng connection khi truy vấn xong
      if (error) {
        res.status(500).send(error)
      }

      const mergeData = infor.map(inf => {
        return {
          ...inf,

          //Câu query không có lấy activity_status. Tuy nhiên login thành công <=> activity_status = active
          activity_status: 'active',

          //Vì chưa có data về Admin trên MongoDB nên phải tạo mô phỏng
          social_network: [],
          activities: []
        }
      })
      res.send(mergeData[0])
    })
  })
})

// Export the router
module.exports = router
