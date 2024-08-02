//import express framework (bắt buộc)
const express = require('express')
const cors = require('cors')

//import verifyToken fuction
const { verifyToken } = require('../authenticate')

module.exports = (client) => {
  //Khởi tạo tham số router và cấp quyền CORS
  const router = express.Router()
  router.use(cors())
  router.use(express.json())

  // Define user-related routes
  router.get('/chatAI', async (req, res) => {
    const { input } = req.query
    const result = await client.chat.completions.create({
      messages: input,
      model: ""
    })

    res.send(result.choices[0].message.content)
  })
  return router
}
