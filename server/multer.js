const multer = require('multer')
const path = require('path');
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  }
})
const upload = multer({ storage: storage })
module.exports = { upload }