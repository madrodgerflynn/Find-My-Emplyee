const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employees_db",
  password: "root1234",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
