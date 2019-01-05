var checkConnection = require('../models/dbConnection');

var add = (email) => {
  return new Promise((resolve, reject) => {
    checkConnection().then((db) => {
      var Query = "INSERT INTO newsletter (email_id) VALUES ('" + email + "')";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else resolve('Added Successfully');
      });
    }, (err) => {
      reject(err);
    })
  })
}

var unsubscribe = (emailId) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "UPDATE newsletter SET status = 0 WHERE email_id='" + emailId + "'";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill(result[0]);
      });
    }, (err) => {
      reject(err);
    })
  });
}


module.exports = {
  add: add,
  unsubscribe: unsubscribe
}