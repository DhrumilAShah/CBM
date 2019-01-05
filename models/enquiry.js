var checkConnection = require('../models/dbConnection');

var add = (name, message, email) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "INSERT INTO enquiry (name,message,email_id) VALUES ('" + name + "','" + message + "','" + email + "')";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill('Added Successfully');
      });
    }, (err) => {
      reject(err);
    })
  })
}

module.exports = {
  add: add,
}