var checkConnection = require('../models/dbConnection');
var databaseConn = require('../models/otherConnection');
var add = (status, user_id, title, category, details, date) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "INSERT INTO complaints (status, user_id, title, category, details,date) VALUES ('" + status + "'," + user_id + ",'" + title + "','" + category + "','" + details + "','" + date + "')";
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
  return new Promise((resolve, reject) => {
    checkConnection().then((db) => {
      var qry = "SELECT c.status,c.complaint_id,DATE_FORMAT(c.date, '%W %M %e %Y') AS date, c.title,c.category,c.details , u.`name` FROM users u,complaints c WHERE c.`user_id`= u.`id`";
      db.query(qry, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    }, (err) => {
      reject(err);
    })
  })
}

var find = (status) => {
  return new Promise((fulfill, reject) => {
    //checkConnection().then((db) => {
    var Query = "SELECT complaints.complaint_id,DATE_FORMAT(complaints.date, '%W %M %e %Y') AS date, complaints.title,complaints.category,complaints.details , users.`name` FROM users,complaints WHERE complaints.`user_id`= users.`id` AND STATUS='" + status + "'";
    databaseConn.query(Query, (err, result) => {
      if (err) reject(err);
      else {
        //console.log();
        fulfill(JSON.stringify(result));
      };
    });
    //}, (err) => {
    //reject(err);
    //})
  })
}

var updateStatus = (id, status) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "UPDATE complaints SET status = '" + status + "' WHERE complaint_id=" + id + "";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill("Status Changed To " + status);
      });
    }, (err) => {
      reject(err);
    })
  });
}


module.exports = {
  add: add,
  updateStatus: updateStatus,
  findAll: findAll,
  find: find
}