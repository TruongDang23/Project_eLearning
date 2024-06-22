const jwt = require('jsonwebtoken')

//Cấu hình JWT: Tạo KEY mã hóa và Function xác thực JWT (project_elearning SHA-512)
const KEY = 'd6cb109246bc06e7b4e88fc0579fa6f5eaf770a93e42e33934419bed7b3a944e629e5f28a6ef0678ccdd5c63ab106838b34fda2ea21a1250fe5c2d1c7f70ceb0'

//Tạo middleware function xác thực JWT. Function được gọi trước khi thực hiện một chức năng bất kỳ
const verifyToken = (req, res, next) => {
  const token = req.headers['token']
  const user = JSON.parse(req.headers['user'])
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, KEY, (err, decoded) => {
    //Nếu sinh ra lỗi hoặc userID và role sau khi decode không trùng khớp với giá trị truyền từ header
    //Phòng hờ trường hợp bị can thiệp trong quá trình gửi gói tin
    if (err || decoded.userID !== user.userID || decoded.role !== user.role)
    {
      return res.status(500).send({ message: 'Failed to authenticate token!' })
    }

    req.userID = decoded.userID
    req.role = decoded.role
    next()
  })
}

module.exports = {
  verifyToken,
  KEY
}