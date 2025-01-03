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

  //import model User
  const User = require('../models/user')

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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const isAuthorization = async(userID) => {
    return new Promise((resolve) => {
      if (userID[0] !== 'A')
        resolve(false)
      else
        resolve(true)
    })
  }
  // Define user-related routes
  router.get('/loadInformation', verifyToken, (req, res) => {
    connMysql.getConnection(async (err, connection) => {
      if (err) {
        res.status(500).send(err)
        return
      }
      if (await isAuthorization(req.userID) == false) {
        res.status(401).send('error')
        return
      }
      else {
        //Get information from mysql
        let query = 'SELECT userID, avatar, fullname, date_of_birth, street, province, country, language\
                 from user where userID = ?'
        connection.query(query, [req.userID], async (error, infor) => {
          connection.release() //Giải phóng connection khi truy vấn xong
          if (error) {
            res.status(500).send(error)
            return
          }
          await connMongo
          const mongoData = await User.findOne({ userID: req.userID }).select()

          const mergeData = infor.map(inf => {
            return {
              ...inf,
              date_of_birth: formatDate(inf.date_of_birth), //format time

              //Câu query không có lấy activity_status. Tuy nhiên login thành công <=> activity_status = active
              activity_status: 'active',

              //Vì chưa có data về activities Admin trên MongoDB nên phải tạo mô phỏng
              social_network: mongoData.social_networks,
              activities: []
            }
          })
          res.send(mergeData[0])
        })
      }
    })
  })

  router.post('/updateInformation', verifyToken, async (req, res) => {
    if (await isAuthorization(req.userID) == false) {
      res.status(401).send('error')
      return
    }
    else {
      const inf = req.body.profile

      //Theo tính toán: các lệnh xử lý trong mongoDB luôn nhanh hơn Mysql
      //Vì vậy trong sự kiện bất đồng bộ thì mysql sẽ thực hiện xong cuối cùng
      await connMongo
      try {
        await User.updateOne(
          { userID: inf.userID },
          { $set: { social_networks: inf.social_network } }
        );
      }
      catch (error) {
        res.send(false)
        return
      }

      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
          return
        }
        else {
          //Get information from mysql
          let query = 'UPDATE user SET avatar = ?, fullname = ?, date_of_birth = ?, street = ?,\
        province = ?, country = ?, language = ? WHERE userID = ?'
          connection.query(query, [inf.avatar, inf.fullname, inf.date_of_birth, inf.street,
            inf.province, inf.country, inf.language, inf.userID], async (error, results) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              res.send(false)
              return
            }
            //Vì mysql xong cuối cùng nên sẽ đảm nhận vai trò res.send(true)
            if (results.affectedRows > 0)
              res.send(true)
          })
        }
      })
    }
  })

  router.get('/getActiveAccounts', verifyToken, async (req, res) => {
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
                        u.userID,
                        avatar,
                        fullname,
                        date_of_birth,
                        created_time,
                        street,
                        province,
                        country,
                        role,
                        activity_status
                      FROM user AS u
                      INNER JOIN account AS a ON u.userID = a.userID
                      WHERE a.activity_status = 'active'`
          connection.query(query, async (error, accounts) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
              return
            }
            const mergeData = accounts.map(acc => {
              return {
                ...acc,
                date_of_birth: (acc.date_of_birth == null) ? '2000-01-01' : formatDate(acc.date_of_birth),
                created_time: formatDateTime(acc.created_time)
              }
            })
            res.send(mergeData)
          })
        }

      })
    }
  })

  router.get('/getLockedAccounts', verifyToken, async (req, res) => {
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
                        u.userID,
                        avatar,
                        fullname,
                        date_of_birth,
                        created_time,
                        street,
                        province,
                        country,
                        role,
                        activity_status
                      FROM user AS u
                      INNER JOIN account AS a ON u.userID = a.userID
                      WHERE a.activity_status = 'locked'`
          connection.query(query, async (error, accounts) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
              return
            }
            const mergeData = accounts.map(acc => {
              return {
                ...acc,
                date_of_birth: (acc.date_of_birth == null) ? '2000-01-01' : formatDate(acc.date_of_birth),
                created_time: formatDateTime(acc.created_time)
              }
            })
            res.send(mergeData)
          })
        }

      })
    }
  })

  router.post('/lockacc', verifyToken, async (req, res) => {
    if (await isAuthorization(req.userID) === false) {
      res.status(401).send('error')
    }
    else {
      const userID = req.body.account
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
          return
        }
        else {
          //Get information from mysql
          let query = `UPDATE account SET activity_status = 'locked' WHERE userID = ?`
          connection.query(query, [userID], async (error) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
              return
            }
            res.send(true)
          })
        }

      })
    }
  })

  router.post('/unlockacc', verifyToken, async (req, res) => {
    if (await isAuthorization(req.userID) === false) {
      res.status(401).send('error')
    }
    else {
      const userID = req.body.account
      connMysql.getConnection((err, connection) => {
        if (err) {
          res.status(500).send(err)
          return
        }
        else {
          //Get information from mysql
          let query = `UPDATE account SET activity_status = 'active' WHERE userID = ?`
          connection.query(query, [userID], async (error) => {
            connection.release() //Giải phóng connection khi truy vấn xong
            if (error) {
              res.status(500).send(error)
              return
            }
            res.send(true)
          })
        }

      })
    }
  })

  return router
}
