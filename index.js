var sessionstore = require('sessionstore');
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
// app.use(session({ secret: 'library',}));
app.use(session({
	secret:"library",
  store: sessionstore.createSessionStore({
    type: 'couchdb',
    host: 'http://192.168.0.66',  // optional
    port: 5984,                // optional
    dbName: 'sessions'
  })	
}));
require("./src/config/passport")(app);
app.set("views",'./src/views');
app.set("view engine", "ejs");

app.use(function(req, res, next) {
  if (!req.user) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
  }
  next();
});

app.use("/admin",adminRouter);
app.use("/auth",authRouter);

app.get("/", function(req, res) {
	if(req.user) {
		res.redirect("/admin");
	}else {
		res.render("pages/index");	
	}
});

app.listen(PORT, "192.168.0.66", function(err) {
  console.log("server is running on :: " + PORT);
});
