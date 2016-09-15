var gulp = require("gulp");
var js_files = ["*.js","src/**/*.js"];
var nodemon = require("gulp-nodemon");
gulp.task("inject",function() {
  var wiredep = require("wiredep").stream;
  var options = {
    bowerJson: require("./bower.json"),
    directory: "./public/lib",
    ignorePath: "../../public"
  };
  return gulp.src("./src/views/*.html")
    .pipe(wiredep(options))
    .pipe(gulp.dest("./src/views"))
});

gulp.task("serve",function(){
  var options = {
    script : "index.js",
    delayTime: 1,
    env:{
      "PORT": 5000
    },
    ext: 'js html css ejs'
  }
  return nodemon(options)
    .on('restart',function(ev){
      console.log("restartihng the server....")      
    })
});

gulp.task("default",["serve","inject"], function() {
});
