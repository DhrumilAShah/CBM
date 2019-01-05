const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cbm",
  port: 3306
});

connectionBool = false;
module.exports = checkConnection = () => {
  return new Promise((fulfill, reject) => {
    if (connectionBool === true) fulfill(db);
    else {
      db.connect(function(err) {
        if (err) reject(err);
        else {
          connectionBool = true;
          fulfill(db);
        }
      });
    }
  });
}