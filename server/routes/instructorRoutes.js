//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import verifyToken fuction
const { verifyToken } = require('../authenticate')

module.exports = (connMysql, connMongo) => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())
  //import model user for query in mongoDB
  const User = require('../models/user')
  const Course = require('../models/courseInfor')

  //Function format 1981-05-11T17:00:00.000Z to 1981-05-12
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  //Function format 1981-05-11T17:00:00.000Z to 1981-05-12 12:00:00
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const isAuthorization = async(userID) => {
    return new Promise((resolve) => {
      if (userID[0] !== 'I')
        resolve(false)
      else
        resolve(true)
    })
  }

  const getCoursePublish = (courseID) => {
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


  const getCoursePublishFull = (courseID) => {
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

  // Define your asynchronous functions
  const updateStatusOfCourse = async (transaction, courseID, status) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      let query = "UPDATE course SET status = ? WHERE courseID = ?";
      transaction.query(query, [status, courseID], async (error, results) => {
        //transaction.release(); //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error);
        }
        //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
        if (results.affectedRows > 0) resolve(true);
      })
    })
  }

  const deleteCourse = async (transaction, database_table, courseID) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      //Get information from mysql
      let query = "DELETE FROM ?? WHERE courseID = ?"
      // const [rows] = await transaction.query(query, [database_table, courseID])
      // if (rows.affectedRows > 0)
      //   resolve(true)
      // else
      //   reject(false)

      transaction.query(query, [database_table, courseID], async (error, results) => {
        //transaction.release(); //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error);
        }
        //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
        if (results.affectedRows > 0) resolve(true);
      })
    })
  }

  const addCreateCourse = async (transaction, courseID, time) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      let query =
          "INSERT INTO created_course (courseID, time) VALUES (?, ?)"
      // const [rows] = await transaction.query(query, [courseID, time])
      // if (rows.affectedRows > 0)
      //   resolve(true)
      // else
      //   reject(false)


      transaction.query(query, [courseID, time], async (error, results) => {
        //transaction.release(); //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error);
        }
        //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
        if (results.affectedRows > 0) resolve(true);
      })
    })
  }

  const addMornitorCourse = async (transaction, courseID, time) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      let query =
          "INSERT INTO send_mornitor (courseID, time) VALUES (?, ?)"
      // const [rows] = await transaction.query(query, [courseID, time])
      // if (rows.affectedRows > 0)
      //   resolve(true)
      // else
      //   reject(false)


      transaction.query(query, [courseID, time], async (error, results) => {
        //transaction.release(); //Giải phóng connection khi truy vấn xong
        if (error) {
          reject(error);
        }
        //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
        if (results.affectedRows > 0) resolve(true);
      })
    })
  }

  // Define user-related routes
  router.get('/loadInformation', verifyToken, async (req, res) => {
    if (await isAuthorization(req.userID) === false)
      res.status(401).send('error')
    else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
        }
        else {
          //Get information from mysql
          let query = `SELECT userID,
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
            }

            //Get data of user from mongoDB
            await connMongo
            const mongoData = await User.findOne({ userID: req.userID }).select()

            //Get information of course user enrolled
            let published
            try {
              const courseInfo = await getCoursePublish(mongoData.course_published)
              published = courseInfo
            }
            catch (error) {
              res.send(error)
            }

            //Merge data: Mysql + MongoDB + Course enrolled
            const mergeData = infor.map(inf => {
              return {
                ...inf,
                date_of_birth: formatDate(inf.date_of_birth),
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
        }
      })
    }
  })

  router.post('/updateInformation', verifyToken, async (req, res) => {
    if (await isAuthorization(req.userID) === false)
      res.status(401).send('error')
    else {
      const inf = req.body.profile
      //Theo tính toán: các lệnh xử lý trong mongoDB luôn nhanh hơn Mysql
      //Vì vậy trong sự kiện bất đồng bộ thì mysql sẽ thực hiện xong cuối cùng
      await connMongo
      try {
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
          }
        )
      }
      catch (error) {
        res.send(false)
      }

      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
        }
        else {
          //Get information from mysql
          let query = `UPDATE user SET 
                        avatar = ?,
                        fullname = ?,
                        date_of_birth = ?,
                        street = ?,
                        province = ?,
                        country = ?,
                        language = ?
                      WHERE userID = ?`
          connection.query(query, [inf.avatar, inf.fullname, inf.date_of_birth, inf.street,
            inf.province, inf.country, inf.language, inf.userID], async (error, results) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              res.send(false)
            }
            //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
            if (results.affectedRows > 0)
              res.send(true)
          })
        }
      })
    }
  })

  // Define user-related routes
  router.get('/loadProfile', verifyToken, async (req, res) => {
    if (await isAuthorization(req.userID) === false)
      res.status(401).send('error')
    else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
        }
        else {
          //Get information from mysql
          let query = `SELECT userID,
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
            }

            //Get data of user from mongoDB
            await connMongo
            const mongoData = await User.findOne({ userID: req.userID }).select()

            //Get information of course user enrolled
            let published
            try {
              const courseInfo = await getCoursePublishFull(mongoData.course_published)
              published = courseInfo
            }
            catch (error) {
              res.send(error)
            }

            //Merge data: Mysql + MongoDB + Course enrolled
            const mergeData = infor.map(inf => {
              return {
                ...inf,
                date_of_birth: formatDate(inf.date_of_birth),

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
        }
      })
    }
  })

  // Define user-related routes
  router.get("/getPublishCourse", verifyToken, async (req, res) => {
    if ((await isAuthorization(req.userID)) === false) {
      res.status(401).send("error")
    } else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
        } else {
          //Get information from mysql
          let query = `SELECT course.courseID, 
                            title, 
                            method, 
                            program, 
                            category, 
                            time,
                            price,
                            currency,
                            userID
                            FROM course 
                            INNER JOIN published_course AS p ON course.courseID = p.courseID
                            WHERE userID = ?`
          connection.query(query, [req.userID], async (error, courses) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
            }

            //List courseIDs which is results of previous query
            const courseIDs = courses.map((course) => course.courseID)

            //Connect to MongoDB server
            await connMongo
            //Get image_introduce of each courseID
            const mongoData = await Course.find({
              courseID: { $in: courseIDs }
            }).select("courseID image_introduce keywords")

            //Merge data with Mysql and MongoDB
            const mergeData = courses.map((course) => {
              const data = mongoData.find(
                (mc) => mc.courseID === course.courseID
              )
              return {
                ...course,
                time: formatDateTime(course.time),
                image_introduce: data ? data.image_introduce : null,
                keywords: data.keywords
              }
            })
            res.send(mergeData)
            res.end()
          })
        }
      })
    }
  })

  // Define user-related routes
  router.get("/getPendingCourse", verifyToken, async (req, res) => {
    if ((await isAuthorization(req.userID)) === false) {
      res.status(401).send("error")
    } else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
        } else {
          //Get information from mysql
          let query = `SELECT course.courseID, 
                            title, 
                            method, 
                            program, 
                            category, 
                            time,
                            price,
                            currency,
                            userID
                            FROM course 
                            INNER JOIN send_mornitor AS s ON course.courseID = s.courseID
                            WHERE userID = ?`
          connection.query(query, [req.userID], async (error, courses) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
            }

            //List courseIDs which is results of previous query
            const courseIDs = courses.map((course) => course.courseID)

            //Connect to MongoDB server
            await connMongo
            //Get image_introduce of each courseID
            const mongoData = await Course.find({
              courseID: { $in: courseIDs }
            }).select("courseID image_introduce keywords")

            //Merge data with Mysql and MongoDB
            const mergeData = courses.map((course) => {
              const data = mongoData.find(
                (mc) => mc.courseID === course.courseID
              )
              return {
                ...course,
                time: formatDateTime(course.time),
                image_introduce: data ? data.image_introduce : null,
                keywords: data.keywords
              }
            })
            res.send(mergeData)
            res.end()
          })
        }
      })
    }
  })

  // Define user-related routes
  router.get("/getCreatedCourse", verifyToken, async (req, res) => {
    if ((await isAuthorization(req.userID)) === false) {
      res.status(401).send("error")
    } else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
        } else {
          //Get information from mysql
          let query = `SELECT course.courseID, 
                            title, 
                            method, 
                            program, 
                            category, 
                            time,
                            price,
                            currency,
                            userID
                            FROM course 
                            INNER JOIN created_course AS c ON course.courseID = c.courseID
                            WHERE userID = ?`
          connection.query(query, [req.userID], async (error, courses) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
            }

            //List courseIDs which is results of previous query
            const courseIDs = courses.map((course) => course.courseID)

            //Connect to MongoDB server
            await connMongo
            //Get image_introduce of each courseID
            const mongoData = await Course.find({
              courseID: { $in: courseIDs }
            }).select("courseID image_introduce keywords")

            //Merge data with Mysql and MongoDB
            const mergeData = courses.map((course) => {
              const data = mongoData.find(
                (mc) => mc.courseID === course.courseID
              )
              return {
                ...course,
                time: formatDateTime(course.time),
                image_introduce: data ? data.image_introduce : null,
                keywords: data.keywords
              }
            })
            res.send(mergeData)
            res.end()
          })
        }
      })
    }
  })

  router.get("/getTerminateCourse", verifyToken, async (req, res) => {
    if ((await isAuthorization(req.userID)) === false) {
      res.status(401).send("error")
    } else {
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
        } else {
          //Get information from mysql
          let query = `SELECT course.courseID, 
                            title, 
                            method, 
                            program, 
                            category, 
                            to_time,
                            end_time,
                            price,
                            currency,
                            userID
                            FROM course 
                            INNER JOIN terminated_course AS c ON course.courseID = c.courseID
                            WHERE userID = ?`
          connection.query(query, [req.userID], async (error, courses) => {
            connection.release(); //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
            }

            //List courseIDs which is results of previous query
            const courseIDs = courses.map((course) => course.courseID)

            //Connect to MongoDB server
            await connMongo
            //Get image_introduce of each courseID
            const mongoData = await Course.find({
              courseID: { $in: courseIDs }
            }).select("courseID image_introduce keywords")

            //Merge data with Mysql and MongoDB
            const mergeData = courses.map((course) => {
              const data = mongoData.find(
                (mc) => mc.courseID === course.courseID
              )
              return {
                ...course,
                to_time: course.to_time ? formatDateTime(course.to_time) : 'permanently',
                end_time: course.end_time ? formatDateTime(course.end_time) : 'permanently',
                image_introduce: data ? data.image_introduce : null,
                keywords: data.keywords
              }
            })
            res.send(mergeData)
            res.end()
          })
        }
      })
    }
  })

  router.post("/recreated", verifyToken, async (req, res) => {
    if ((await isAuthorization(req.userID)) === false) {
      res.status(401).send("error");
    } else {
      const courseID = req.body.course;
      const time = formatDateTime(new Date());
      connMysql.getConnection(async(err, connection) => {
        //const transaction = connMysql.promise()

        //await transaction.query("START TRANSACTION")
        try {
          await Promise.all([
            updateStatusOfCourse(connection, courseID, "created"),
            deleteCourse(connection, "terminated_course", courseID),
            addCreateCourse(connection, courseID, time)
          ]);
          // Proceed to the next step here
          //await transaction.query("COMMIT")
          connection.release()
          res.send(true)
          res.end()
        } catch (error) {
          console.log(error)
          //await transaction.query("ROLLBACK")
          connection.release()
          res.send(false)
          res.end()
        }
      })
    }
  })

  router.post("/sendapprove", verifyToken, async (req, res) => {
    if ((await isAuthorization(req.userID)) === false) {
      res.status(401).send("error");
    } else {
      const courseID = req.body.course;
      const time = formatDateTime(new Date());
      connMysql.getConnection(async(err, connection) => {
        //const transaction = connMysql.promise()

        //await transaction.query("START TRANSACTION")
        try {
          await Promise.all([
            updateStatusOfCourse(connection, courseID, "mornitor"),
            deleteCourse(connection, "created_course", courseID),
            addMornitorCourse(connection, courseID, time)
          ]);
          // Proceed to the next step here
          //await transaction.query("COMMIT")
          connection.release()
          res.send(true)
          res.end()
        } catch (error) {
          console.log(error)
          //await transaction.query("ROLLBACK")
          connection.release()
          res.send(false)
          res.end()
        }
      })
    }
  })

  return router
}
