//import some library
const cors = require('cors')
const session = require('express-session')
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http') // Thêm thư viện http
const { Server } = require('socket.io') // Import Server từ socket.io

//import database (khi nào cần connect database nào thì gọi cái phù hợp)
const connMysql = require('./connMySql')

const mongo = require('./connMongo')
const connMongo = mongo()

const client = require('./connAzureOpenAI')

// Import routes
const adminRoutes = require('./routes/adminRoutes')(connMysql, connMongo) //Truyền các connection cần thiết vào các Route
const studentRoutes = require('./routes/studentRoutes')(connMysql, connMongo)
const instructorRoutes = require('./routes/instructorRoutes')(connMysql, connMongo)
const systemRoutes = require('./routes/systemRoutes')(connMysql, connMongo)
const courseRoutes = require('./routes/courseRoutes')(connMysql, connMongo)
const chatGeneration = require('./routes/chatGeneration')(client)

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Setup session
var sessionMiddleware = session({
  secret: 'd6cb109246bc06e7b4e88fc0579fa6f5eaf770a93e42e33934419bed7b3a944e629e5f28a6ef0678ccdd5c63ab106838b34fda2ea21a1250fe5c2d1c7f70ceb0',
  resave: true,
  saveUninitialized: true
})

app.use(sessionMiddleware)

// Use routes
app.use('/ad', sessionMiddleware, adminRoutes) // All admin routes will have a prefix of /ad
app.use('/st', sessionMiddleware, studentRoutes)
app.use('/in', sessionMiddleware, instructorRoutes)
app.use('/s', sessionMiddleware, systemRoutes)
app.use('/c', sessionMiddleware, courseRoutes)
app.use('/chat', sessionMiddleware, chatGeneration)

// Cấu hình CORS
app.use(cors())

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`)
// })


// Tạo HTTP server
const server = http.createServer(app)

// Cấu hình socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Thay đổi theo port của React app
    methods: ["GET", "POST"],
    credentials: true
  }
})

// Chia sẻ session với socket.io
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next)
})

// Định nghĩa các sự kiện socket.io
io.on('connection', (socket) => {
  console.log('A user connected')

  // Truy cập session nếu cần
  // const session = socket.request.session
  // console.log('Session ID:', session.id)

  // Xử lý các sự kiện từ client
  socket.on('message', (data) => {
    console.log('Message received:', data)
    // Phản hồi lại client
    socket.emit('message', `Server nhận được: ${data}`)
  })

  socket.on('notificationSelected', (data) => {
    console.log('Notification selected:', data.notifyID);
    // Xử lý sự kiện (ví dụ: đánh dấu là đã đọc, ghi log, v.v.)
  });

  // Xử lý ngắt kết nối
  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

// Bắt đầu server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})