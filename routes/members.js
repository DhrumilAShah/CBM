var express = require('express');
var router = express.Router();
const users = require('../models/users');


/* GET home page. */
router.get('/', function(req, res, next) {

	 users.findByCategory(5).then((val) => {	
    res.render('members', {
      title: 'members',
      clientName: val
    });
  }).catch((err) => {
    console.log(err)
  });







});



module.exports = router;
