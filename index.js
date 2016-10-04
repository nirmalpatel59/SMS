var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var PORT = process.env.PORT || 5000;
var adminRouter = require("./src/routes/adminRoutes");
var authRouter = require("./src/routes/authRoutes");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'library',}));
require("./src/config/passport")(app);
app.set("views",'./src/views');
app.set("view engine", "ejs");

app.use("/admin",adminRouter);
app.use("/auth",authRouter);

app.get("/", function(req, res) {
  res.render("pages/index");
});

app.listen(PORT, function(err) {
  console.log("server is running on :: " + PORT);
});
