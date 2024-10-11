//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import jwt library & verifyToken fuction
const jwt = require('jsonwebtoken')
const { KEY } = require('../authenticate')

//import verifyToken fuction
const { verifyToken } = require('../authenticate')

//import library to get current time
const { format } = require('date-fns')

//import model user for inserting into mongoDB
const User = require('../models/user')
const Course = require('../models/courseInfor')
const mongo = require('mongoose')
const mongoSession = mongo.startSession()

module.exports = (connMysql, connMongo) => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())

  //Define some function use in that routes (controller)
  const countUserOfRole = (role) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
          return
        }

        let query = 'SELECT count(*) AS count FROM account WHERE LEFT(userID, 1) = ?'
        connection.query(query, [role], (error, results) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(error)
            return
          }
          resolve(results[0].count)
        })
      })
    })
  }

  const getUserIDBasedEmail = (mail) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
          return
        }

        let query = 'SELECT userID FROM user WHERE mail = ?'
        connection.query(query, [mail], (error, results) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(error)
            return
          }
          if (results.length == 0)
            resolve('null')
          else
            resolve(results[0].userID)
        })
      })
    })
  }

  const getAccountBasedUserID = (mail) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
          return
        }

        let query = 'SELECT userID, role FROM user WHERE mail = ?'
        connection.query(query, [mail], (error, results) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(error)
            return
          }
          if (results.length == 0)
            resolve('null')
          else
            resolve(results[0])
        })
      })
    })
  }

  const isLocked = (userID) => {
    return new Promise((resolve, reject) => {
      connMysql.getConnection((err, connection) => {
        if (err) {
          reject(err)
          return
        }

        let query = 'SELECT activity_status FROM account WHERE userID = ?'
        connection.query(query, [userID], (error, results) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            reject(error)
            return
          }
          if (results[0].activity_status == 'locked')
            resolve(true)
          else
            resolve(false)
        })
      })
    })
  }

  const getCurrentDateTime = () => {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  }

  const insertUserIntoMysql = (user, callback) => {
    connMysql.getConnection((err, connection) => {
      if (err) {
        callback(err, null)
        return
      }

      let query = 'INSERT INTO account (username, password, userID, activity_status) values (?, ?, ?, ?)'
      connection.query(query, [user.username, user.password, user.userID, 'active'], (error, results) => {
        if (error) {
          callback(error, null)
          return
        }
        if (results.affectedRows > 0) //Nếu như insert into account xong
        {
          let userQuery = 'INSERT INTO user (userID, avatar, fullname, date_of_birth, mail, created_time,\
                        street, province, country, language, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
          connection.query(userQuery, [user.userID, user.avatar, user.name, null, user.mail, getCurrentDateTime(), null, null, null, null, user.role], (userError, userResults) => {
            connection.release()
            if (userError) {
              callback(userError, null)
              return
            }
            if (userResults.affectedRows > 0) {
              callback(null, true)
              return
            } else {
              callback(null, false)
              return
            }
          })
        }
        else {
          callback(null, false)
          return
        }
      })
    })
  }

  const insertUserIntoMongo = (user, callback) => {
    connMongo
    const newUser = new User({
      userID: user.userID,
      self_introduce: ' '
    })

    // Insert data into mongoDB
    newUser.save()
      // eslint-disable-next-line no-unused-vars
      .then(result => {
        callback(null, true)
        return
      })
      .catch(error => {
        callback(error, null)
        return
      })
  }

  // Define user-related routes (that is API)
  router.post('/login', (req, res) => {
    //Get username, pass, role from Client
    const { username, pass, role } = req.body

    //Handle role
    let roleOfUser = ''
    if (role === 'Admin')
      roleOfUser = 'A'
    else if (role === 'Student')
      roleOfUser = 'S'
    else if (role === 'Instructor')
      roleOfUser = 'I'

    connMysql.getConnection((err, connection) => {
      if (err) throw err

      else {
        let query = 'SELECT userID from account WHERE username = ? AND password = ? AND LEFT(userID,1) = ? AND activity_status <> "locked"'
        connection.query(query, [username, pass, roleOfUser], (error, results) => {
          connection.release()
          if (error) throw error
          if (results.length > 0) {
            //sign JWT token. Sign 2 value: userID & role. JWT using for authentication when user handle any function
            const token = jwt.sign({ userID: results[0].userID, role: role }, KEY, { expiresIn: 86400 })
            //Respond 3 value to the client: token, userID, role
            //When user handle any function. We will decode JWT then compare with userID & role. If its equal --> process, if not --> cancel
            res.json({
              token: token,
              userID: results[0].userID,
              role: role
            })
          }
          else
            res.send('User are not existed')
        })
      }
    })
  })

  router.post('/signup', (req, res) => {
    const { username, pass, role } = req.body
    let roleOfUser = ''
    if (role === 'Admin')
      roleOfUser = 'A'
    else if (role === 'Student')
      roleOfUser = 'S'
    else if (role === 'Instructor')
      roleOfUser = 'I'

    //Insert user vào mysql và mongoDB
    const insertUser = async () => {
      let userID = ''
      let num
      let betweenCharacter

      //Đếm số lượng user để tạo userID tương ứng
      try {
        const count = await countUserOfRole(roleOfUser)
        num = count
      } catch (error) {
        res.status(500).send(error)
      }

      //Xử lý userID
      betweenCharacter = (num < 10) ? '00' : (num < 100) ? '0' : ''
      userID = roleOfUser + betweenCharacter + num

      let user = {
        userID: userID,
        username: username,
        password: pass,
        role: role,
        avatar: '',
        mail: '',
        name: ''
      }

      try {
        (await mongoSession).startTransaction()

        insertUserIntoMysql(user, (error, result) => {
          if (error || result === false)
            res.send(false)
          else {
            insertUserIntoMongo(user, (error, result) => {
              if (error || result === false)
                res.send(false)
              else
                res.send(true)
            })
          }
        })
        ;(await mongoSession).commitTransaction
      }
      catch {
        (await mongoSession).abortTransaction
        res.send(false)
      }
      finally {
        (await mongoSession).endSession
      }
    }
    insertUser()
  })

  // Define user-related routes (that is API)
  router.post('/loginWithGoogle', async(req, res) => {
    const { loginCredential } = req.body
    const dataDecode = jwt.decode(loginCredential)

    const userID = await getUserIDBasedEmail(dataDecode.email)

    if (userID === 'null')
    {
      //SIGN UP
      let userID = ''
      let num
      let betweenCharacter
      let roleOfUser = 'S'
      //Đếm số lượng user để tạo userID tương ứng
      try {
        const count = await countUserOfRole(roleOfUser)
        num = count
      } catch (error) {
        res.status(500).send(error)
      }

      //Xử lý userID
      betweenCharacter = (num < 10) ? '00' : (num < 100) ? '0' : ''
      userID = roleOfUser + betweenCharacter + num
      let user = {
        userID: userID,
        username: dataDecode.email,
        password: dataDecode.sub,
        role: 'Student',
        avatar: dataDecode.picture,
        mail: dataDecode.email,
        name: dataDecode.name
      }

      insertUserIntoMysql(user, (error, result) => {
        if (error || result === false) {
          res.send('error')
        }
        else {
          insertUserIntoMongo(user, (error, result) => {
            if (error || result === false) {
              res.send('error')
            }
            else
            {
              //LOGIN

              //sign JWT token. Sign 2 value: userID & role. JWT using for authentication when user handle any function
              const token = jwt.sign({ userID: user.userID, role: user.role }, KEY, { expiresIn: 86400 })
              //Respond 3 value to the client: token, userID, role
              //When user handle any function. We will decode JWT then compare with userID & role. If its equal --> process, if not --> cancel
              res.json({
                token: token,
                userID: user.userID,
                role: user.role
              })
            }
          })
        }
      })
    }
    else
    {
      // Check Account is locked
      if (isLocked(userID) === true) {
        res.send('locked')
        res.end()
      }

      // Get Account Based UserID
      const account = await getAccountBasedUserID(dataDecode.email)
      //LOGIN
      //sign JWT token. Sign 2 value: userID & role. JWT using for authentication when user handle any function
      const token = jwt.sign({ userID: account.userID, role: account.role }, KEY, { expiresIn: 86400 })
      //Respond 3 value to the client: token, userID, role
      //When user handle any function. We will decode JWT then compare with userID & role. If its equal --> process, if not --> cancel
      res.json({
        token: token,
        userID: account.userID,
        role: account.role
      })
    }

  })

  router.get('/loadCourseWelcome', (req, res) => {
    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err)
      }

      else {
        let query = 'SELECT course.courseID, title, fullname, star, raters, price FROM avg_rating\
                INNER JOIN published_course ON avg_rating.courseID = published_course.courseID\
                INNER JOIN course ON avg_rating.courseID = course.courseID\
                INNER JOIN user ON course.userID = user.userID\
                LIMIT 9'
        connection.query(query, async (error, courses) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            res.status(500).send(error)
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

            res.send(mergeData)
          }
        })
      }
    })
  })

  router.get('/loadAvatar', verifyToken, async (req, res) => {
    const { userID } = req.query
    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err)
      }
      else {
        //Get avatar in table user
        let query = 'SELECT avatar FROM user where userID = ?'
        connection.query(query, [userID], async (error, avatar) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            res.status(500).send(error)
          }
          res.send(avatar[0].avatar)
        })
      }
    })
  })

  router.get('/loadNotification', async (req, res) => {
    const { userID } = req.query
    connMysql.getConnection((err, connection) => {
      if (err) {
        res.status(500).send(err)
      }
      else {
        //Get avatar in table user
        let query = `
        select noti.notifyID,
               title,
               message,
               routing,
               isRead,
               image_course,
               time 
          from receive_notify as rece
          inner join notify as noti on noti.notifyID = rece.notifyID
          where userID = ?`
        connection.query(query, [userID], async (error, notification) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            res.status(500).send(error)
          }
          res.send(notification)
        })
      }
    })
  })

  return router
}