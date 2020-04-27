
let db = require("./dbConnect.js"); 
db.DbConnect.setUpDB(); 
var data = db.DbConnect.getDb();

module.exports.addReq = function (req, res){
     
    var cur = new db.DbConnect(); 
    cur.addReq(req,parameters); 
}

module.exports.getVolunteers = function (){
    db.DbConnect.getVolunteers(data).then((dict) => {
        d = dict; 
    }); 
}

