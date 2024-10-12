//import some library
const cors = require('cors')
const session = require('express-session')
const express = require('express')
const bodyParser = require('body-parser')

//import database (khi nào cần connect database nào thì gọi cái phù hợp)
const connMysql = require('./connMySql')

const mongo = require('./connMongo')
const connMongo = mongo()

const client = require('./connAzureOpenAI')

// Import routes
const adminRoutes = require('./routes/adminRoutes')(connMysql, connMongo) //Truyền các connection cần thiết vào các Route
const studentRoutes = require('./routes/studentRoutes')(connMysql, connMongo)
const instructorRoutes = require('./routes/instructorRoutes')(
  connMysql,
  connMongo
)
const systemRoutes = require('./routes/systemRoutes')(connMysql, connMongo)
const courseRoutes = require('./routes/courseRoutes')(connMysql, connMongo)
const chatGeneration = require('./routes/chatGeneration')(client)

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Setup session
var sessionMiddleware = session({
  secret:
    'd6cb109246bc06e7b4e88fc0579fa6f5eaf770a93e42e33934419bed7b3a944e629e5f28a6ef0678ccdd5c63ab106838b34fda2ea21a1250fe5c2d1c7f70ceb0',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
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

app.listen(port, () => {
  console.log(`SERVER running at http://localhost:${port}/`)
})