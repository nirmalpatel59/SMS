var express = require("express");
var adminRouter = express.Router();
var adminController = require("../controller/adminController")(); 
adminRouter.use(function(req,res,next) {
  if(!req.user) {
    res.redirect("/");
  }
  next();
});
adminRouter.route("/")
  .get(adminController.getList);
adminRouter.route("/addnew")
  .get(adminController.addNew)
  .post(adminController.insertNew);
adminRouter.route("/edit/:id")
  .get(adminController.editList);
adminRouter.route("/import")
  .get(function(req, res) {
    console.log("hello");
  });

module.exports = adminRouter;
