
let db = require("./dbConnect.js"); 
db.DbConnect.setUpDB(); 
var data = db.DbConnect.getDb();
var num = 0; 
module.exports.addReq = function (req, res){
     
    var cur = new db.DbConnect(); 
    num++; 
    var temp = cur.addReq(data, req.query, num); 
    temp.then(() =>{
        res.json("true"); 
    })
    .catch((err) =>{
        res.json(err); 
    })
}

module.exports.getVolunteers = function (){
    db.DbConnect.getVolunteers(data).then((dict) => {
        d = dict; 
    }); 
}

