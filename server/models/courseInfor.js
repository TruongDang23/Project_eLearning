const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  courseID: { type: String },
  image_introduce: { type: String }

  //Điền thêm các thuộc tính khác nếu cần
})
const Course = mongoose.model('course', courseSchema, 'course_structure')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến courseID trong model này thì sẽ gọi bằng: course.courseID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

module.exports = Course