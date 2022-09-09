const mysql = require("mysql2");
const express = require("express");
const DB = require("./db/DB.js");

// const PORT = processes.env.PORT || 3001;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employees_db",
  password: "root1234",
});

let db = new DB(connection);
console.log(DB);
db.promptEmployee();
