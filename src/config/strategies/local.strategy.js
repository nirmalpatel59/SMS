var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });
var database = nconf.get("DB"),
    source_uname = nconf.get("DB_USERNAME"),
    source_upass = nconf.get("DB_PASSWORD"),
    db_url       = nconf.get("COUCH_URL");
    console.log(source_uname + " -- "+source_upass);
    console.log(db_url);
var nano  = require('nano')('http://'+source_uname+':'+source_upass+'@'+db_url);
var db    = nano.db.use(database);

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
};