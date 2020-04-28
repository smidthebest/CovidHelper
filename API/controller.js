
let db = require("./dbConnect.js"); 
db.DbConnect.setUpDB(); 
var data = db.DbConnect.database();
var con = new db.DbConnect(); 
var num = 0; 


module.exports.postReq = function (req, res){
     
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

/*
    The volunteer who wants to accept this request will call this method. 
    Query parameters include the name of the volunteer, and the name of the request. 
*/
module.exports.acceptReq = function(req, res){
    var name = req.query["name"]; 
    var request = req.query["request"]; 
    con.acceptRequest(data, name, request).then(ans => 
        con.communicate( ans[0].token, ans[1])
    )
    .then((resp) =>{
        res.json(resp); 
    })
    .catch((err) =>{
        console.log(err); 
        res.sendStatus(500); 
    })
}

