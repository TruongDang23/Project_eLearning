let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password:'truong050123',
  database: 'projectelearning'
})

connection.connect(function(err) {
  if (err) throw err
  console.log("Connected!")
})