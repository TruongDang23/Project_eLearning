const express = require('express')
const router = express.Router()

// Define user-related routes
router.get('/users', (req, res) => {
  res.send('Get all users')
})

router.post('/users', (req, res) => {
  res.send('Create a new user')
})

// Export the router
module.exports = router
