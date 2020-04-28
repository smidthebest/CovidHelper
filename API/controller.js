
let db = require("./dbConnect.js"); 
db.DbConnect.setUpDB(); 
var data = db.DbConnect.getDb();
var con = new db.DbConnect(); 
var num = 0; 
module.exports.addReq = function (req, res){
     
    num++; 
    con.addReq(data, req.query, num) 
    .then(() =>{
        res.json("true"); 
    })
    .catch((err) =>{
        res.json(err); 
    })
}

module.exports.getReq = function(req, res){
    con.getDb(data, "requests").then((dict) => {
        res.json(dict); 
     })
     .catch((err) =>{
         res.json(err); 
     }) 
}

module.exports.getVolunteers = function (req, res){
    con.getDb(data, "volunteers").then((dict) => {
       res.json(dict); 
    })
    .catch((err) =>{
        res.json(err); 
    })
}

module.exports.getCustomers = function(req, res){
    con.getDb(data, "customers").then((dict) =>{
        res.json(dict); 
    })
    .catch((err) =>{
        res.json(err); 
    }) 
}

