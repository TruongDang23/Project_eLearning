//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import verifyToken fuction
const { verifyToken } = require('../authenticate')

//import database (khi nào cần connect database nào thì gọi cái phù hợp)
const connMysql = require('../connMySql')

const mongo = require('../connMongo')
const connMongo = mongo()

//Khởi tạo tham số router và cấp quyền CORS
const router = express.Router()
router.use(cors())
router.use(express.json())

//import model user for query in mongoDB
const User = require('../models/user')

const getCourseEnroll = (courseID) => {
  return new Promise((resolve, reject) => {
    connMysql.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }

      //Get information of course with courseID is an array
      let query = 'SELECT c.courseID, title, time, method\
                    FROM course as c\
                    INNER JOIN published_course as pc ON c.courseID = pc.courseID\
                    WHERE c.courseID IN (?)'
      connection.query(query, [courseID], (error, results) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error)
          return
        }
        resolve(results)
      })
    })
  })
}

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

      //Get data of user from mongoDB
      await connMongo
      const mongoData = await User.findOne({ userID: req.userID }).select()

      //Get information of course user enrolled
      let published
      try
      {
        const courseInfo = await getCourseEnroll(mongoData.course_published)
        published = courseInfo
      }
      catch (error)
      {
        res.send(error)
      }

      //Merge data: Mysql + MongoDB + Course enrolled
      const mergeData = infor.map(inf => {
        return {
          ...inf,

          //Câu query không có lấy activity_status. Tuy nhiên login thành công <=> activity_status = active
          activity_status: 'active',

          social_network: mongoData.social_networks,
          self_introduce: mongoData.self_introduce,
          expertise: mongoData.expertise,
          degrees: mongoData.degrees,
          projects: mongoData.projects,
          working_history: mongoData.working_history,
          course_published: published
        }
      })
      //console.log(mergeData)
      res.send(mergeData[0])
    })
  })
})

// Export the router
module.exports = router
