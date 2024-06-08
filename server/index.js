//import some library
const cors = require('cors')
const session = require('express-session')
const express = require('express')

const app = express()
const port = 3000

// Import routes
const userRoutes = require('./routes/userRoutes')
const systemRoutes = require('./routes/systemRoutes')

//Setup session
app.use(session({
  //secret key là hash 512 của 'project_elearning'
  secret: 'd6cb109246bc06e7b4e88fc0579fa6f5eaf770a93e42e33934419bed7b3a944e629e5f28a6ef0678ccdd5c63ab106838b34fda2ea21a1250fe5c2d1c7f70ceb0',
  resave: false, // Không lưu lại phiên làm việc nếu không có sự thay đổi
  saveUninitialized: false // Không lưu lại phiên làm việc cho phiên mới chưa được khởi tạo
}))

// Use routes
app.use('/u', userRoutes) // All user routes will have a prefix of /u
app.use('/s', systemRoutes) // All system routes will have a prefix of /s
app.use(cors())

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
