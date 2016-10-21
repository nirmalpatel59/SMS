var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });
var passport = require("passport"),
    database     = nconf.get("DB"),
    source_uname = nconf.get("DB_USERNAME"),
    source_upass = nconf.get("DB_PASSWORD"),
    db_url       = nconf.get("COUCH_URL"),
    nano  = require('nano')('http://'+source_uname+':'+source_upass+'@'+db_url);
    db    = nano.db.use(database);

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, cb) {
    cb(null, user.username);
  });

  passport.deserializeUser(function(user, cb) {
    db.view('sms','getLoggedInStatus',{key:user.username},function(err, body) {
      if (!err) {
        if(body.rows.length > 0) {
          cb(null, body.rows[0].value);
        }else {
          console.log("No Details found for current loggen in user");
        }
      }else {
        console.log(err);
        console.log("in else deserialize");
      }
    });
  });
  require("./strategies/local.strategy")();
};
