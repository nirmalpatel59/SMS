var nconf = require('nconf');
nconf.argv().env().file({ file: 'config.json' });
var database       = nconf.get("DB"),
    source_uname = nconf.get("DB_USERNAME"),
    source_upass = nconf.get("DB_PASSWORD"),
    db_url       = nconf.get("COUCH_URL");
var nano  = require('nano')('http://'+source_uname+':'+source_upass+'@'+db_url);
var db    = nano.db.use(database);

var adminController = function() {
  var getList = function(req,res) {
    db.view('sms','getAllStudents',function(err, body) {
      console.log(req.user);
      if (!err) {
        res.render("pages/admin",{
          list: body.rows,
          user:req.user
        });
        return;
      }else {
        console.log("in else");
      }
    });
  };
  var addNew = function(req,res) {
    res.render("pages/addnew",{
      list:''
    });
  };
  var insertNew = function(req,res) {
    db.insert(req.body, function(err, body) {
      if (!err) {
        res.redirect("/admin");
      }
    });
  };
  var editList = function(req,res) {
    var docid = req.params.id;
    db.get(docid, function(err, body) {
      if (!err)
        res.render("pages/addnew",{
          list: body
        });
    });
  };
  return {
    getList:getList,
    addNew:addNew,
    editList:editList,
    insertNew:insertNew
  };
};
module.exports = adminController;