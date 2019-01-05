var express = require('express');
var router = express.Router();
var passport = require('passport');
const newsletter = require('../models/newsletter');
const enquiry = require('../models/enquiry');
var validator = require('validator');
//var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'index'

  });
});

router.post('/', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (user === false) {
      res.render('index', {
        isWrong: true
      });
    } else {
      req.login(user, function(err) {
        if (err) return next(err);
        else {
          req.session.user = user;
          //console.log("SESSION in index.js: " + req.session.passport.user);
          //console.log(req.session.user, req.user);
          //res.session.user = req.session.passport.user;
          req.session.save();
          return res.redirect('/dashboard');
        }
      });
    }
  })(req, res, next);
});

router.post('/newsletter', function(req, res) {
    if (req.body.email == undefined || req.body.email.trim() == "" || !validator.isEmail(req.body.email)) {
      res.sendStatus(400);
    } else {
      newsletter.add(req.body.email).then((val) => {
        res.send(val);
      }).catch((err) => {
        res.sendStatus(500);
      });
    }
  })
  .post('/enquiry', function(req, res) {
    if (req.body.email == undefined || req.body.email.trim() == "" || !validator.isEmail(req.body.email)) {
      res.sendStatus(400);
    } else {
      enquiry.add(req.body.name, req.body.message, req.body.email).then((val) => {
        res.send(val);
      }).catch((err) => {
        res.sendStatus(500); //Internal Server Error
      });
    }
  });


function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/')
  }
}

module.exports = router;