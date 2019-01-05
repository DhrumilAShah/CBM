var express = require('express');
var router = express.Router();
const users = require('../models/users');
var nodemailer = require("nodemailer");
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {

	 users.findByCategory(5).then((val) => {
 
    res.render('task-create', {
      title: 'task-create',
      clientName: val
    });

  }).catch((err) => {
    console.log(err)
  });
});


router.post('/', function(req, res, next) {


	
});


var smtpTransport = nodemailer.createTransport({  
    service: "gmail",  
    host: "smtp.gmail.com",  
    auth: {  
        user: "developerofficeid@gmail.com",  
        pass: "Dhrum!l@123"  
    }  
});  
  
router.get('/', function(req, res) {  
    res.sendfile('members');  
});  
  
router.get('/sendmail', function(req, res) { 
     var mailOptions = {  
        to:req.query.email,  
        subject:"Email From CBM Team",  
        html:'<div>Name: '+ req.query.name +'</div><div>Email: '+ req.query.email +'</div><div>Mobile: '+ req.query.mobile +'</div><div>Address: '+ req.query.address +'</div>'  
    }  
    smtpTransport.sendMail(mailOptions, function(error, response) {  
     if(error) {  
        console.log(error);
        res.end("error");  
     } else {  
        res.end("sent");  
     }  
   });  
});  
  

module.exports = router;
