var express = require('express');
var router = express.Router();
const user = require('../models/users');
var validator = require('validator');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('member-details', {
      title: 'member-details'
    });
  })
  .post('/', function(req, res) {
    user.createWithFullDetails(req.body.name, req.body.email, req.body.mobile, req.body.address, req.body.city, req.body.pincode, req.body.website, req.body.category)
      .then((val) => {
        res.send(val);
      }).catch((err) => {
        console.log(err);
        res.sendStatus(500); //Internal Server Error
      });
   // }
  }).get('/:id',(req,res,next)=>{
    user.find(req.params.id).then((val)=>{

      res.render('member-details', {
        title: 'member-details',
        userDetails:val
      });


    }).catch((err)=>{console.log(err);res.sendStatus(500)});
    
  });

module.exports = router;