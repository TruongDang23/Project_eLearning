//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import verifyToken fuction
const { verifyToken } = require('../authenticate')

const mongo = require('mongoose')

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
    return `${year}-${month}-${day}`
    // return `${day}-${month}-${year}`
  }

  const isAuthorization = async(userID) => {
    return new Promise((resolve) => {
      if (userID[0] !== 'S')
        resolve(false)
      else
        resolve(true)
    })
  }

  //import model user for query in mongoDB
  const User = require('../models/user')
  const Course = require('../models/courseInfor')

  const getCourseEnroll = (courseID) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
          return
        }

        else {
          let query = 'SELECT c.courseID, title, fullname as instructor, star, raters, price, currency\
                    FROM course as c\
                    INNER JOIN published_course as pc ON c.courseID = pc.courseID\
                    INNER JOIN user as u ON u.userID = c.userID\
                    INNER JOIN avg_rating as avg ON avg.courseID = c.courseID\
                    WHERE c.courseID IN (?)'
          connection.query(query, [courseID], async (error, courses) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              reject(error)
              return
            }

            else {
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
                  image_introduce: data ? data.image_introduce : null
                }
              })
              resolve(mergeData)
            }
          })
        }
      })
    })
  }

  // Define user-related routes
  router.get('/loadInformation', verifyToken, async(req, res) => {
    if (await isAuthorization(req.userID) === false) {
      res.status(401).send('error')
      return
    }
    else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
          return
        }
        else {
          //Get information from mysql
          let query = `SELECT 
                          userID,
                          avatar,
                          fullname,
                          date_of_birth,
                          street,
                          province,
                          country,
                          language
                      from user where userID = ?`
          connection.query(query, [req.userID], async (error, infor) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
              return
            }

            //Get data of user from mongoDB
            await connMongo
            const mongoData = await User.findOne({ userID: req.userID }).select()

            //Get information of course user enrolled
            let enrolled
            try {
              if (mongoData.course_enrolled.length != 0)
              {
                const courseInfo = await getCourseEnroll(mongoData.course_enrolled)
                enrolled = courseInfo
              }
              else
                enrolled = []
            }
            catch (error) {
              res.status(404).send(error)
              return
            }
            //Merge data: Mysql + MongoDB + Course enrolled
            const mergeData = infor.map(inf => {
              return {
                ...inf,
                date_of_birth: (inf.date_of_birth == null) ? '2000-01-01' : formatDate(inf.date_of_birth),
                //Câu query không có lấy activity_status. Tuy nhiên login thành công <=> activity_status = active
                activity_status: 'active',

                social_network: (mongoData.social_networks != null) ? mongoData.social_networks : [],
                self_introduce: (mongoData.self_introduce != null) ? mongoData.self_introduce : [],
                expertise: (mongoData.expertise != null) ? mongoData.expertise : [],
                degrees: (mongoData.degrees != null) ? mongoData.degrees : [],
                projects: (mongoData.projects != null) ? mongoData.projects : [],
                working_history: (mongoData.working_history != null) ? mongoData.working_history : [],
                course_enrolled: enrolled
              }
            })
            //console.log(mergeData[0])
            res.send(mergeData[0])
          })
        }
      })
    }
  })

  router.post('/updateInformation', verifyToken, async (req, res) => {
    if (await isAuthorization(req.userID) === false) {
      res.status(401).send('error')
      return
    }
    else {
      const inf = req.body.profile
      const mongoSession = await mongo.startSession()
      //Theo tính toán: các lệnh xử lý trong mongoDB luôn nhanh hơn Mysql
      //Vì vậy trong sự kiện bất đồng bộ thì mysql sẽ thực hiện xong cuối cùng
      // await connMongo

      // (await mongoSession).startTransaction

      // await User.updateOne(
      //   { userID: inf.userID },
      //   {
      //     $set:
      //     {
      //       social_networks: inf.social_network,
      //       self_introduce: inf.self_introduce,
      //       expertise: inf.expertise,
      //       degrees: inf.degrees,
      //       projects: inf.projects,
      //       working_history: inf.working_history
      //     }
      //   }
      // );
      const promisePool = connMysql.promise();

      connMysql.getConnection(async (err, connection) => {
        if (err) {
          res.status(500).send(err)
          return
        }
        else {
          mongoSession.startTransaction()
          await promisePool.query("START TRANSACTION")

          await User.updateOne(
            { userID: inf.userID },
            {
              $set:
              {
                social_networks: inf.social_network,
                self_introduce: inf.self_introduce,
                expertise: inf.expertise,
                degrees: inf.degrees,
                projects: inf.projects,
                working_history: inf.working_history
              }
            },
            {
              session: mongoSession
            }
          );
          //Get information from mysql
          let query = `UPDATE user SET avatar = ?,
                            fullname = ?,
                            date_of_birth = ?,
                            street = ?,
                            province = ?,
                            country = ?,
                            language = ?
                          WHERE userID = ?`

          const [rows] = await promisePool.query(query, [inf.avatar, inf.fullname, inf.date_of_birth, inf.street,
            inf.province, inf.country, inf.language, inf.userID]);

          if (rows.affectedRows == 0)
          {
            await promisePool.query("ROLLBACK")
            await mongoSession.abortTransaction()
            mongoSession.endSession()
            res.send(false)
            return
          }
          else
          {
            await promisePool.query("COMMIT")
            await mongoSession.commitTransaction()
            mongoSession.endSession()
            res.send(true)
            res.end()
          }
        }
      })

      // connMysql.getConnection((err, connection) => {
      //   if (err) {
      //     res.status(500).send(err)
      //     return
      //   }
      //   else {
      //     //Get information from mysql
      //     let query = `UPDATE user SET
      //                     avatar = ?,
      //                     fullname = ?,
      //                     date_of_birth = ?,
      //                     street = ?,
      //                     province = ?,
      //                     country = ?,
      //                     language = ?
      //                   WHERE userID = ?`
      //     connection.query(query, [inf.avatar, inf.fullname, inf.date_of_birth, inf.street,
      //       inf.province, inf.country, inf.language, inf.userID], async (error, results) => {
      //       connection.release() //Giải phóng connection khi truy vấn xong
      //       if (error) {
      //         res.send(false)
      //         return
      //       }
      //       //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
      //       if (results.affectedRows > 0)
      //         res.send(true)
      //     })
      //   }
      // })
    }
  })

  router.get('/loadProfile', verifyToken, async(req, res) => {
    if (await isAuthorization(req.userID) === false) {
      res.status(401).send('error')
      return
    }
    else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
          return
        }
        else {
          //Get information from mysql
          let query = `SELECT 
                          userID,
                          avatar,
                          fullname,
                          date_of_birth,
                          street,
                          province,
                          country
                      from user where userID = ?`
          connection.query(query, [req.userID], async (error, infor) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
              return
            }

            //Get data of user from mongoDB
            await connMongo
            const mongoData = await User.findOne({ userID: req.userID }).select()

            //Get information of course user enrolled
            let enrolled
            try {
              if (mongoData.course_enrolled.length != 0)
              {
                const courseInfo = await getCourseEnroll(mongoData.course_enrolled)
                enrolled = courseInfo
              }
              else
                enrolled = []
            }
            catch (error) {
              res.status(404).send(error)
              return
            }
            //Merge data: Mysql + MongoDB + Course enrolled
            const mergeData = infor.map(inf => {
              return {
                ...inf,
                date_of_birth: (inf.date_of_birth == null) ? '2000-01-01' : formatDate(inf.date_of_birth),
                //Câu query không có lấy activity_status. Tuy nhiên login thành công <=> activity_status = active
                activity_status: 'active',

                social_network: (mongoData.social_networks != null) ? mongoData.social_networks : [],
                self_introduce: (mongoData.self_introduce != null) ? mongoData.self_introduce : [],
                expertise: (mongoData.expertise != null) ? mongoData.expertise : [],
                degrees: (mongoData.degrees != null) ? mongoData.degrees : [],
                projects: (mongoData.projects != null) ? mongoData.projects : [],
                working_history: (mongoData.working_history != null) ? mongoData.working_history : [],
                course_enrolled: enrolled
              }
            })
            res.send(mergeData[0])
            // console.log(mergeData[0])
          })
        }
      })
    }
  })

  return router
}
