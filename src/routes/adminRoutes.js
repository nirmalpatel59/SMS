var express = require("express");
var adminRouter = express.Router();
var list = [
        { id:1,
          name: "nirmal",
          sid: "Ab123456",
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
adminRouter.route("/")
  .get(function(req,res) {
    res.render("pages/admin",{
      list: list
    });
  });
adminRouter.route("/addnew")
  .get(function(req,res) {
    res.render("pages/addnew");
  });

module.exports = adminRouter;
