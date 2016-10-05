var express    = require("express");
var authRouter = express.Router();
var nano       = require('nano')('http://nirmal:nirmal@localhost:5984');
var db         = nano.db.use("sms-admin");
var passport = require("passport");

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