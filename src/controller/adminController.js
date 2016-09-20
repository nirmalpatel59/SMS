var nano = require('nano')('http://nirmal:nirmal@localhost:5984');
var db   = nano.db.use("sms-admin");

var adminController = function(list) {
  var getList = function(req,res) {
    db.view('sms','getAllStudents',function(err, body) {
      if (!err) {
        console.log(body);
        res.render("pages/admin",{
          list: body.rows
        });
      }else {

      }
    });
  };
  var addNew = function(req,res) {
    res.render("pages/addnew",{
      list:''
    });
  };
  var insertNew = function(req,res) {
    console.log(req.body);
    db.insert(req.body, function(err, body) {
      if (!err) {
        res.redirect("/admin");
      }
    });
  };
  var editList = function(req,res) {
    var docid = req.params.id;
    console.log(docid);
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
  }
}
module.exports = adminController;