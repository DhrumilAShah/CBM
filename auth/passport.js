const passport = require('passport');
const LocalStratgy = require('passport-local').Strategy;
const user = require('../models/users');


passport.serializeUser(function(user, done) {
  console.log(user.email);
  done(null, user.email);
});
passport.deserializeUser(function(email, done) {
  user.findByemailId(email).then((val) => {
    console.log(val);
    done(err, val);
  });
});

let signUp = new LocalStratgy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  user.create(email, password).then(function(value) {
    console.log(value);
    return done(null, 'done', null);
  }, function(error) {
    console.log(error);
    return done(null, false, null);
  });
});

let login = new LocalStratgy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  user.checkAuth(email, password).then(function(value) {
    return done(null, value);
  }, function(error) {
    return done(null, false, null);
  });
});

passport.use('local-signup', signUp);
passport.use('local-login', login);

module.exports = passport;