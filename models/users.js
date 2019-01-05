//var uuid = require('uuid/v4')
var bcrypt = require('bcryptjs');
var checkConnection = require('../models/dbConnection');

var create = (email, password) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "INSERT INTO users (email, password) VALUES ('" + email + "', '" + bcrypt.hashSync(password, bcrypt.genSaltSync(12)) + "')";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill('User Added Successfully');
      });
    }, (err) => {
      reject(err);
    })
  })
}

var createWithFullDetails = (name, emailId, mobile, address, city, pincode, website, category) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "INSERT INTO users (name,email,Phone_no,address,city,pin_code,website,role) VALUES ('" +
        name + "','" + emailId + "','" + mobile + "','" + address + "','" + city + "'," + pincode + ",'" + website + "'," + category + ")";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill('User Added Successfully');
      });
    }, (err) => {
      reject(err);
    })
  })
}

var findByemailId = (emailId) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "SELECT * from users WHERE email = '" + email + "'";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill(result[0]);
      });
    }, (err) => {
      reject(err);
    })
  });
}

var findByCategory = (categoryId) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "SELECT id,name from users WHERE role = " + categoryId + "";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill(result);
      });
    }, (err) => {
      reject(err);
    })
  });
}

var find = (id) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "SELECT * from users WHERE id = " + id + "";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else fulfill(result);
      });
    }, (err) => {
      reject(err);
    })
  });
}

var checkAuth = (email, password) => {
  return new Promise((fulfill, reject) => {
    checkConnection().then((db) => {
      var Query = "SELECT * from users WHERE email = '" + email + "'";
      db.query(Query, (err, result) => {
        if (err) reject(err);
        else {
          if (result[0] == null || result[0] == undefined || result[0].password == undefined) reject('No Such User');
          else {
            if (bcrypt.compareSync(password, result[0].password)) {
              fulfill(result[0]);
            } else {
              reject('Incorrect Password');
            }
          }
        }
      });
    }, (err) => {
      reject(err);
    })
  });
}

module.exports = {
  create: create,
  findByemailId: findByemailId,
  checkAuth: checkAuth,
  createWithFullDetails: createWithFullDetails,
  find: find,
  findByCategory: findByCategory
}