//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import verifyToken fuction
const { verifyToken } = require('../authenticate')

//import model Course
const Course = require('../models/courseInfor')

module.exports = (connMysql, connMongo) => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())

  //Function format 1981-05-11T17:00:00.000Z to 1981-05-12
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}-${month}-${year}`
  }

  // Define user-related routes
  router.get('/getPublishCourse', verifyToken, (req, res) => {
    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err)
      }
      //Get information from mysql
      let query = 'SELECT s.courseID, title, method, program, u.fullname AS teacher, s.time\
                  FROM published_course AS s\
                  LEFT JOIN course AS c ON s.courseID = c.courseID\
                  LEFT JOIN user AS u ON s.userID = u.userID\
                  ORDER BY s.time DESC'
      connection.query(query, async (error, courses) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          res.status(500).send(error)
        }

        //List courseIDs which is results of previous query
        const courseIDs = courses.map(course => course.courseID)

        //Connect to MongoDB server
        await connMongo
        //Get image_introduce of each courseID
        const mongoData = await Course.find({ courseID: { $in: courseIDs } }).select('courseID image_introduce')

        //Merge data with Mysql and MongoDB
        const mergeData = courses.map(course => {
          const data = mongoData.find(mc => mc.courseID === course.courseID)
          return {
            ...course,
            time: formatDate(course.time),
            image_introduce: data ? data.image_introduce : null
          }
        })
        res.send(mergeData)
      })
    })
  })

  router.get('/getMonitorCourse', verifyToken, (req, res) => {
    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err)
      }
      //Get information from mysql
      let query = 'SELECT s.courseID, title, method, program, u.fullname AS teacher, s.time\
                  FROM send_mornitor AS s\
                  LEFT JOIN course AS c ON s.courseID = c.courseID\
                  LEFT JOIN user AS u ON s.userID = u.userID\
                  ORDER BY s.time DESC'
      connection.query(query, async (error, courses) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          res.status(500).send(error)
        }

        //List courseIDs which is results of previous query
        const courseIDs = courses.map(course => course.courseID)

        //Connect to MongoDB server
        await connMongo
        //Get image_introduce of each courseID
        const mongoData = await Course.find({ courseID: { $in: courseIDs } }).select('courseID image_introduce')

        //Merge data with Mysql and MongoDB
        const mergeData = courses.map(course => {
          const data = mongoData.find(mc => mc.courseID === course.courseID)
          return {
            ...course,
            time: formatDate(course.time),
            image_introduce: data ? data.image_introduce : null
          }
        })
        res.send(mergeData)
      })
    })
  })

  router.get('/getTerminateCourse', verifyToken, (req, res) => {
    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err)
      }
      //Get information from mysql
      let query = 'SELECT s.courseID, title, method, program, u.fullname AS teacher, s.to_time, s.end_time\
                  FROM terminated_course AS s\
                  LEFT JOIN course AS c ON s.courseID = c.courseID\
                  LEFT JOIN user AS u ON s.userID = u.userID\
                  ORDER BY s.to_time DESC, s.end_time ASC'
      connection.query(query, async (error, courses) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          res.status(500).send(error)
        }

        //List courseIDs which is results of previous query
        const courseIDs = courses.map(course => course.courseID)

        //Connect to MongoDB server
        await connMongo
        //Get image_introduce of each courseID
        const mongoData = await Course.find({ courseID: { $in: courseIDs } }).select('courseID image_introduce')

        //Merge data with Mysql and MongoDB
        const mergeData = courses.map(course => {
          const data = mongoData.find(mc => mc.courseID === course.courseID)
          return {
            ...course,
            to_time: formatDate(course.to_time),
            end_time: course.end_time ? formatDate(course.end_time) : 'permanently',
            image_introduce: data ? data.image_introduce : null
          }
        })
        res.send(mergeData)
      })
    })
  })
  return router
}
