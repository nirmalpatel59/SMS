var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
var nano = require('nano')('http://nirmal:nirmal@localhost:5984');
var db   = nano.db.use("sms-admin");

module.exports = function () {
  passport.use(new LocalStrategy ({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, cb) {
    db.view('sms','getLoggedInStatus', {key:username},function(err, body) {
      if(!err) {
        if(body.rows.length > 0 && password == body.rows[0].value.password) {
          var user =  {
            username: body.rows[0].value.username,
            password: body.rows[0].value.password
          };
          cb(null, user);
        }else {
          cb(null,false);
        }
      }else {
        cb(null,false);
      }
    });
  }));
}