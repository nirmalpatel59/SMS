var express = require("express");
var authRouter = express.Router();

authRouter.route("/login")
.post(function(req, res) {
  console.log(req.body);
  req.login(req.body, function (){
    res.redirect("/admin/import");
  });
});

module.exports = authRouter;