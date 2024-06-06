//import some library for handle http
const cors = require('cors')

const express = require('express')
const app = express()
const port = 3000

// Import routes
const userRoutes = require('./routes/userRoutes')
const systemRoutes = require('./routes/systemRoutes')

// Use routes
app.use('/u', userRoutes) // All user routes will have a prefix of /u
app.use('/s', systemRoutes) // All system routes will have a prefix of /s
app.use(cors())

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
