var express    = require("express");
var authRouter = express.Router();
var passport = require("passport");
var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });
var database = nconf.get("DB"),
    source_uname = nconf.get("DB_USERNAME"),
    source_upass = nconf.get("DB_PASSWORD"),
    db_url       = nconf.get("COUCH_URL");

authRouter.route("/login")
.post(passport.authenticate('local', {
  failureRedirect: '/'
}),function(req, res) {
  res.redirect("/admin");
  // req.login(req.body, function (){
  //   res.redirect("/admin/import");
  // });
});

module.exports = authRouter;