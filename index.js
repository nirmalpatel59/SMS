var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 5000;
var adminRouter = require("./src/routes/adminRoutes");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.set("views",'./src/views');
app.set("view engine", "ejs");

passport.use(new Strategy(
	function(username, password, cb) {
  	db.users.findByUsername(username, function(err, user) {
	    if (err) { return cb(err); }
	    if (!user) { return cb(null, false); }
	    if (user.password != password) { return cb(null, false); }
	    return cb(null, user);
	  });
	})
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/admin",
  require('connect-ensure-login').ensureLoggedIn(),adminRouter);

app.get("/", function(req, res) {
  res.render("pages/index");
});
app.get("/login", function(req, res) {
  res.redirect("/");
});

app.post("/login",passport.authenticate('local', {failureRedirect:"/admin/import"}), function(req, res) {
		res.redirect("/admin");
  // res.render("pages/admin");
});

app.listen(PORT, function(err) {
  console.log("server is running on :: " + PORT);
});
