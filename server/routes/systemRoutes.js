//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const KEY = 'd6cb109246bc06e7b4e88fc0579fa6f5eaf770a93e42e33934419bed7b3a944e629e5f28a6ef0678ccdd5c63ab106838b34fda2ea21a1250fe5c2d1c7f70ceb0'

//import database (khi nào cần connect database nào thì gọi cái phù hợp)
const mysql = require('mysql2')
const mongo = require('mongoose')

//import library to get current time
const { format } = require('date-fns')

//import model user for inserting into mongoDB
const User = require('../models/user')
const Course = require('../models/courseInfor')

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

// Kết nối đến MongoDB
const connectDB = async () => {
  try {
    await mongo.connect('mongodb+srv://projectelearning:vLax7TJiNr4Od51h@kltn.t9bv5oz.mongodb.net/projectelearning?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    //console.error('Error connecting to MongoDB', err)
    process.exit(1) // Dừng ứng dụng nếu không thể kết nối
  }
}

//Define some function use in that routes (controller)
const countUserOfRole = (role) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
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

const getCurrentDateTime = () => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss')
}

const insertUserIntoMysql = (user, callback) => {
  pool.getConnection((err, connection) => {
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
        let userQuery = 'INSERT INTO user (userID, avatar, fullname, date_of_birth, created_time,\
                        street, province, country, language, role) VALUES (?, ?, ?, ? ,? ,? ,? ,? ,? ,?)'
        connection.query(userQuery, [user.userID, null, null, null, getCurrentDateTime(), null, null, null, null, user.role], (userError, userResults) => {
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
      else
      {
        callback(null, false)
        return
      }
    })
  })
}

const insertUserIntoMongo = (user, callback) => {
  connectDB()
  const newUser = new User({
    userID: user.userID,
    self_introduce: ' '
  })

  // Insert data into mongoDB
  newUser.save()
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
        const token = jwt.sign({ userID: results[0].userID, role: results[0].roleOfUser }, KEY, { expiresIn: 86400 })
        res.send(token)
      }
      else
        res.status(404).send('User are not existed')
    })
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
      res.send(error)
    }

    //Xử lý userID
    betweenCharacter = (num < 10) ? '00' : (num < 100) ? '0' : ''
    userID = roleOfUser + betweenCharacter + num
    let user = {
      userID: userID,
      username: username,
      password: pass,
      role: role
    }

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
  }
  insertUser()
})


router.get('/loadCourseWelcome', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err)
    }

    let query = 'SELECT course.courseID, title, fullname, star, raters, price FROM avg_rating\
                INNER JOIN published_course ON avg_rating.courseID = published_course.courseID\
                INNER JOIN course ON avg_rating.courseID = course.courseID\
                INNER JOIN user ON published_course.userID = user.userID\
                LIMIT 9'
    connection.query(query, async (error, courses) => {
      connection.release() //Giải phóng connection khi truy vấn xong
      if (error) {
        console.log(error)
      }

      //List courseIDs which is results of previous query
      const courseIDs = courses.map(course => course.courseID)

      //Connect to MongoDB server
      await connectDB()

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
    })
  })
})
// Export the router
module.exports = router