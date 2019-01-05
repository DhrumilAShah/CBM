const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cbm",
  port: 3306
});
db.connect(function(err) {
  if (err) throw err
});
module.exports = db;