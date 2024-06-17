const mongo = require('mongoose')

// Kết nối đến MongoDB
const connectMongo = async () => {
  try {
    await mongo.connect('mongodb+srv://projectelearning:vLax7TJiNr4Od51h@kltn.t9bv5oz.mongodb.net/projectelearning?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    //console.error('Error connecting to MongoDB', err)
    process.exit(1) // Dừng ứng dụng nếu không thể kết nối
  }
}

module.exports = connectMongo