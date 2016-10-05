var express = require("express");
var adminRouter = express.Router();
var list = [
        { id:1,
          name: "nirmal",
          sid: "AB110011",
          marks: "90",
          per: "98" 
        },
        { id:2,
          name: "rajesh",
          sid: "AC120099",
          marks: "60",
          per: "88" 
        },
        { id:3,
          name: "tejas",
          sid: "LL123323",
          marks: "78",
          per: "90" 
        },
        { id:4,
          name: "pela",
          sid: "papa",
          marks: "50",
          per: "68" 
        }
      ];
var adminController = require("../controller/adminController")(list); 
adminRouter.use(function(req,res,next) {
  if(!req.user) {
    res.redirect("/")
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
    console.log(req.user);
    res.json(req.user);
  });

module.exports = adminRouter;
