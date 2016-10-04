var passport = require("passport");

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(user, cb) {
      cb(null, user);
    // db.users.findById(id, function (err, user) {
    //   if (err) { return cb(err); }
    //   cb(null, user);
    // });
  });

  require("./strategies/local.strategy")();
};
