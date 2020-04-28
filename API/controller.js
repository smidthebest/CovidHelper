
let db = require("./dbConnect.js"); 
db.DbConnect.setUpDB(); 
var data = db.DbConnect.getDb();
var num = 0; 
module.exports.addReq = function (req, res){
     
    var cur = new db.DbConnect(); 
    num++; 
    var temp = cur.addReq(data, req.query, num); 
    console.log(temp); 
    if(temp == true) res.json("true"); 
    else res.json("False"); 
}

module.exports.getVolunteers = function (){
    db.DbConnect.getVolunteers(data).then((dict) => {
        d = dict; 
    }); 
}

