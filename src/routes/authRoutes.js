var express    = require("express");
var authRouter = express.Router();
var passport = require("passport");


authRouter.route("/login")
.post(passport.authenticate('local', {
  failureRedirect: '/'
}),function(req, res) {
  res.redirect("/admin");
});

authRouter.route("/logout")
.get(function(req, res) {
	req.session.destroy();
	req.logout();
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.redirect("/");
});

module.exports = authRouter;