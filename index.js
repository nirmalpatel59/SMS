var express = require("express");
var app = express();
var PORT = process.env.PORT || 5000;
var adminRouter = require("./src/routes/adminRoutes");
app.use(express.static('public'));
app.set("views",'./src/views');
app.set("view engine", "ejs");

app.use("/admin",adminRouter);

app.get("/", function(req, res) {
  res.render("pages/index");
});

app.listen(PORT, function(err) {
  console.log("server is running on :: " + PORT);
});
