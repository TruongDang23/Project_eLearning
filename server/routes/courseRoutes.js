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

  //Function format 1981-05-11T17:00:00.000Z to 1981-05-12 12:00:00
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  // Define your asynchronous functions
  const updateStatusOfCourse = async (courseID, status) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        //Get information from mysql
        let query = 'UPDATE course SET status = ? WHERE courseID = ?'
        connection.query(query, [status, courseID], async (error, results) => {
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

  const deleteCourse = async (database_table, courseID) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        //Get information from mysql
        let query = 'DELETE FROM ?? WHERE courseID = ?'
        connection.query(query, [database_table, courseID], async (error, results) => {
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
  }

  const addPublishCourse = async (courseID, time) => {

    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        //Get information from mysql
        let query = 'INSERT INTO published_course (courseID, time)\
                     VALUES (?, ?)'
        connection.query(query, [courseID, time], async (error, results) => {
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

  const addCreateCourse = async (courseID, time) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        //Get information from mysql
        let query = 'INSERT INTO created_course (courseID, time)\
                     VALUES (?, ?)'
        connection.query(query, [courseID, time], async (error, results) => {
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

  const getReview = async (courseID) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          return reject(err)
        }

        const query =
        ` SELECT u.fullname AS reviewerName, message, star, time AS date
          FROM rating AS r
          LEFT JOIN user AS u ON r.userID = u.userID
          WHERE courseID = ?`
        connection.query(query, [courseID], (error, reviews) => {
          connection.release()
          if (error) {
            return reject(error)
          }

          const finalData = reviews.map(rv => {
            return {
              ...rv,
              date: formatDateTime(rv.date)
            }
          })

          resolve(finalData)
        })
      })
    })
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
        updateStatusOfCourse(courseID, 'terminated'),
        deleteCourse('published_course', courseID),
        addTerminateCourse(courseID, dateRange)
      ]);
      // Proceed to the next step here
      res.send(true)
    } catch (error) {
      res.send(false)
    }

  })

  router.post('/republish', verifyToken, async (req, res) => {
    const courseID = req.body.course
    const time = formatDateTime(new Date())

    try {
      await Promise.all([
        updateStatusOfCourse(courseID, 'published'),
        deleteCourse('terminated_course', courseID),
        addPublishCourse(courseID, time)
      ]);
      // Proceed to the next step here
      res.send(true)
    } catch (error) {
      res.send(false)
    }

  })

  router.post('/publish', verifyToken, async (req, res) => {
    const courseID = req.body.course
    const time = formatDateTime(new Date())

    try {
      await Promise.all([
        updateStatusOfCourse(courseID, 'published'),
        deleteCourse('send_mornitor', courseID),
        addPublishCourse(courseID, time)
      ]);
      // Proceed to the next step here
      res.send(true)
    } catch (error) {
      res.send(false)
    }

  })

  router.post('/reject', verifyToken, async (req, res) => {
    const courseID = req.body.course
    const time = formatDateTime(new Date())

    try {
      await Promise.all([
        updateStatusOfCourse(courseID, 'created'),
        deleteCourse('send_mornitor', courseID),
        addCreateCourse(courseID, time)
      ]);
      // Proceed to the next step here
      res.send(true)
    } catch (error) {
      res.send(false)
    }

  })

  router.get('/loadDetailCourse', async (req, res) => {
    const { courseID } = req.query;
    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err)
      }
      //Get detail information of course
      let query = 'SELECT c.courseID,\
                    u.fullname AS instructor,\
                    type_of_course,\
                    title,\
                    method,\
                    c.language,\
                    price,\
                    currency,\
                    program,\
                    category,\
                    course_for,\
                    status,\
                    num_lecture,\
                    avg.star,\
                    num.number_enrolled\
                  FROM course AS c\
                  LEFT JOIN user AS u ON c.userID = u.userID\
                  LEFT JOIN avg_rating AS avg ON c.courseID = avg.courseID\
                  LEFT JOIN (SELECT courseID, count(*) AS number_enrolled\
                              FROM enroll\
                              GROUP BY courseID) AS num\
                              ON num.courseID = c.courseID\
                  WHERE c.courseID = ?'
      connection.query(query, [courseID], async (error, courseInfor) => {
        connection.release() //Giải phóng connection khi truy vấn xong
        if (error) {
          res.status(500).send(error)
        }

        //Connect to MongoDB server
        await connMongo
        //Get mongoData. MongoData wil be return an array which 1 element so we will get data at index 0
        const mongoData = await Course.find({ courseID: { $in: courseID } }).select()

        //Get review of this course
        const review = await getReview(courseID)

        //Merge data with Mysql + MongoDB + Reviewer
        const mergeData = courseInfor.map(course => {
          return {
            ...course,
            duration: 10, //chưa xử lý
            review: review,
            image_introduce: mongoData[0].image_introduce,
            video_introduce: mongoData[0].video_introduce,
            keywords: mongoData[0].keywords,
            targets: mongoData[0].targets,
            requirements: mongoData[0].requirements,
            chapters: mongoData[0].chapters
          }
        })
        res.send(mergeData)
      })
    })
  })

  return router
}
