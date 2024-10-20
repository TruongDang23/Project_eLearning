/* eslint-disable no-console */
const http = require('http') // Thêm thư viện http
const { Server } = require('socket.io') // Import Server từ socket.io
const connMysql = require('./connMySql')
// Tạo HTTP server
const server = http.createServer()

const port = 3001

const mysqlTransaction = connMysql.promise()

// Cấu hình socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Thay đổi theo port của React app
    methods: ['GET', 'POST'],
    credentials: true
  }
})

const calculateUnRead = async(userID) => {
  return new Promise((resolve, reject) => {
    connMysql.getConnection(async (err) => {
      if (err) {
        reject(err)
      }

      try {
        await mysqlTransaction.query("START TRANSACTION")

        const students = `SELECT count(*) as unread from receive_notify WHERE userID = ? AND isRead = false`

        const [rows] = await mysqlTransaction.query(students, [userID])

        await mysqlTransaction.query("COMMIT")

        resolve(rows[0].unread)
      } catch (error) {
        reject(error)
      }
    })
  })
}

// Định nghĩa các sự kiện socket.io
io.on('connection', (socket) => {
  socket.on('joinGroupIndividual', (groupID) => {
    //This group to getting data for idividual user
    socket.join(groupID)
  })

  // Listen for 'updateUnreadCount' from a client or system
  socket.on('updateUnreadCount', (newUnreadCount, userID) => {
    const groupID = userID
    io.to(groupID).emit('unreadCountUpdated', newUnreadCount)
  })

  socket.on('newNotify', (courseID, userID) => {

    connMysql.getConnection(async (err) => {
      if (err) { console.log(err) }

      try {
        await mysqlTransaction.query("START TRANSACTION")

        const students = `SELECT userID FROM enroll WHERE courseID = ? AND userID != ?`

        const [rowsStudents] = await mysqlTransaction.query(students, [courseID, userID])

        const instructor = `SELECT userID FROM course WHERE courseID = ?`
        const [rowsIntructor] = await mysqlTransaction.query(instructor, [courseID])

        await mysqlTransaction.query("COMMIT")

        // Get list student who enroll this course
        const userIDs = rowsStudents.map(row => row.userID)
        // Get intructor who create this course
        userIDs.push(rowsIntructor[0].userID)

        for (const id of userIDs) {
          const unreadNoti = await calculateUnRead(id)
          io.to(id).emit('receiveNewNotify')
          io.to(id).emit('unreadCountUpdated', unreadNoti)
        }
      } catch (error) {
        console.log(error)
      }
    })

  } )
})

server.listen(port, () => {
  console.log(`SOCKET running at http://localhost:${port}/`)
});