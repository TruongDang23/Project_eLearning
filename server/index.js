//import some library
const cors = require('cors')
const session = require('express-session')
const express = require('express')
const bodyParser = require('body-parser')

// Import routes
const adminRoutes = require('./routes/adminRoutes')
const studentRoutes = require('./routes/studentRoutes')
const systemRoutes = require('./routes/systemRoutes')

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
app.use('/s', sessionMiddleware, systemRoutes)

// Cấu hình CORS
app.use(cors())

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
