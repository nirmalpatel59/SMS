var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

module.exports = function () {
  passport.use(new LocalStrategy ({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, cb) {
    var user = {
      username:username,
      password:password
    };
    cb(null, user);
  }));
}