var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        if (user === false) {
            res.render('signup');
        } else {
            res.redirect('/');
        }
    })(req, res, next);
});

module.exports = router;
