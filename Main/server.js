const mysql = require("mysql2");
const express = require("express");

const PORT = processes.env.PORT || 3001;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "root1234",
});
