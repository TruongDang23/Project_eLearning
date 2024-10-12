const http = require('http') // Thêm thư viện http
const { Server } = require('socket.io') // Import Server từ socket.io
// Tạo HTTP server
const server = http.createServer()

const port = 3001

// Cấu hình socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Thay đổi theo port của React app
    methods: ['GET', 'POST'],
    credentials: true
  }
})
// Định nghĩa các sự kiện socket.io
io.on('connection', (socket) => {
  console.log('A user connected')

  // Truy cập session nếu cần
  // const session = socket.request.session
  // console.log('Session ID:', session.id)

  // Xử lý các sự kiện từ client
  socket.on('message', (data) => {
    // console.log('Message received:', data)
    // Phản hồi lại client
    // socket.emit('message', `Server nhận được: ${data}`)


  })

  socket.on('notification', (data) => {
    // console.log('Notification received:', data)
    // Gửi thông báo đến tất cả client
    // io.emit('notification', data)
  })

  socket.on('notificationSelected', (data) => {
    console.log('Notification selected:', data)
    // Xử lý sự kiện (ví dụ: đánh dấu là đã đọc, ghi log, v.v.)
  })

  socket.on('unreadCount', (count) => {
    // console.log('Unread count:', count)
    // Xử lý sự kiện (ví dụ: cập nhật trạng thái chưa đọc, ghi log, v.v.)

  })

  // Xử lý ngắt kết nối
  socket.on('disconnect', () => {
    // console.log('A user disconnected')
  })
})
server.listen(port, () => {
  console.log(`SOCKET running at http://localhost:${port}/`);
});