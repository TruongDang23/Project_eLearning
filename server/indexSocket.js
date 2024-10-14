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
  socket.on('joinGroupIndividual', (groupID) => {
    //This group to getting data for idividual user
    socket.join(groupID)
  })

  // Listen for 'updateUnreadCount' from a client or system
  socket.on('updateUnreadCount', (newUnreadCount, token) => {
    const groupID = token
    io.to(groupID).emit('unreadCountUpdated', newUnreadCount);
  })

})
server.listen(port, () => {
  console.log(`SOCKET running at http://localhost:${port}/`)
});