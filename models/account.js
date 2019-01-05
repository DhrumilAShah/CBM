var checkConnection = require('../models/dbConnection');
var databaseConn = require('../models/otherConnection');
var add = (client_id, sales_date, type, description, amount, created_by) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "INSERT INTO accounts (client_id,sales_date,type,description,amount,created_by) VALUES (" +
        client_id + ",'" + sales_date + "','" + type + "','" + description + "'," + amount + "," + created_by + ")";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill('Added Successfully');
      });
    }, (err) => {
      reject(err);
    })
  })
}

var findAll = () => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var qry = "SELECT DATE_FORMAT(sales_date, '%W %M %e %Y') AS sales_date,description,amount,name,type FROM accounts a,users u WHERE STATUS=1 AND a.`client_id` = u.`id`";
      db.query(qry, (err, result) => {
        if (err) reject(err);
        else fulfill(result);
      });
    }, (err) => {
      reject(err);
    })
  })
}

var find = (type) => {
  return new Promise((fulfill, reject) => {
    //checkConnection().then((db) => {
    var Query = "SELECT DATE_FORMAT(sales_date, '%W %M %e %Y') AS sales_date,accounts.`id`,description,amount,name FROM accounts,users WHERE accounts.`type`='" + type + "' AND STATUS=1 AND accounts.`client_id` = users.`id`";
    databaseConn.query(Query, (err, result) => {
      if (err) reject(err);
      else {
        console.log(result);
        fulfill(result)
      };
    });
    // }, (err) => {
    //   reject(err);
    // })
  })
}

var update = (id) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "Update accounts set status = 0 where id=" + id + "";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill(result.message);
      });
    }, (err) => {
      reject(err);
    })
  })
}

var addUsingCSV = (email, description, amount, sales_date, type) => {
  return new Promise((fulfill, reject) => {
    var Query = "INSERT INTO accounts(client_id,sales_date,type,description,amount)" +
      " VALUES ((SELECT id FROM users WHERE email='" + email + "'),'" + sales_date + "','" + type + "','" + description + "'," + amount + ")";
    databaseConn.query(Query, (err, result) => {
      if (err) reject(err);
      else fulfill(result);
    });
  })
}



module.exports = {
  add: add,
  findAll: findAll,
  find: find,
  update: update,
  addUsingCSV: addUsingCSV
}