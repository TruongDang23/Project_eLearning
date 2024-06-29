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

  // Define your asynchronous functions
  const updateStatusOfCourse = async (courseID) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        //Get information from mysql
        let query = 'UPDATE course SET status = "published" WHERE courseID = ?'
        connection.query(query, [courseID], async (error, results) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(err)
          }
          //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
          if (results.affectedRows > 0)
            resolve(true)
        })
      })
    })
  }

  const deletePublishCourse = async (courseID) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        //Get information from mysql
        let query = 'DELETE FROM published_course WHERE courseID = ?'
        connection.query(query, [courseID], async (error, results) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(err)
          }
          //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
          if (results.affectedRows > 0)
            resolve(true)
        })
      })
    })
  };

  const addTerminateCourse = async (courseID, dateRange) => {
    const to_time = dateRange[0]
    const end_time = (dateRange[1] == '' ? null : dateRange[1])

    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        //Get information from mysql
        let query = 'INSERT INTO terminated_course (courseID, to_time, end_time)\
                     VALUES (?, ?, ?)'
        connection.query(query, [courseID, to_time, end_time], async (error, results) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(err)
          }
          //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
          if (results.affectedRows > 0)
            resolve(true)
        })
      })
    })
  };

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
                  LEFT JOIN user AS u ON c.userID = u.userID\
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
                  LEFT JOIN user AS u ON c.userID = u.userID\
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
                  LEFT JOIN user AS u ON c.userID = u.userID\
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

  router.post('/terminated', verifyToken, async (req, res) => {
    const courseID = req.body.course
    const dateRange = req.body.dateRange

    try {
      await Promise.all([
        updateStatusOfCourse(courseID),
        deletePublishCourse(courseID),
        addTerminateCourse(courseID, dateRange)
      ]);
      // Proceed to the next step here
      res.send(true)
    } catch (error) {
      res.send(false)
    }

  })
  return router
}
