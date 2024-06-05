const express = require('express')
const app = express()
const port = 3000

// Import routes
const userRoutes = require('./routes/userRoutes')

// Use routes
app.use('/api', userRoutes) // All user routes will have a prefix of /api

// Home route
app.get('/', (req, res) => {
  let mysql = require('mysql2')
  let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password:'truong050123',
    database: 'projectelearning'
  })

  connection.connect(function(err) {
    if (err) throw err
    console.log("Connected!")
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
