
let db = require("./dbConnect.js"); 
db.DbConnect.setUpDB(); 
var data = db.DbConnect.database();
var con = new db.DbConnect(); 
var num = 0; 

/*
    Adds a request to the database, made from a customer. 
*/
module.exports.postReq = function (req, res){
     
    num++; 
    con.addReq(data, req.query, num) 
    .then(() =>{
        res.json("true"); 
    })
    .catch((err) =>{
        res.json(err); 
        res.sendStatus(500); 
    })
}

/*
    Sends to the client all of the requests in the database. 
*/
module.exports.getReq = function(req, res){
    con.getDb(data, "requests").then((dict) => {
        res.json(dict); 
     })
     .catch((err) =>{
         res.json(err); 
         res.sendStatus(500); 
     }) 
}
/*
    Sends to the client all of the volunteers in the database. 
*/
module.exports.getVolunteers = function (req, res){
    con.getDb(data, "volunteers").then((dict) => {
       res.json(dict); 
    })
    .catch((err) =>{
        res.json(err); 
        res.sendStatus(500); 
    })
}

/*
    Sends to the client all of the customers in the database. 
*/
module.exports.getCustomers = function(req, res){
    con.getDb(data, "customers").then((dict) =>{
        res.json(dict); 
    })
    .catch((err) =>{
        res.json(err); 
        res.sendStatus(500); 
    }) 
}

/*
    The volunteer who wants to accept this request will call this method. 
    Query parameters include the name of the volunteer, and the name of the request. 
*/
module.exports.acceptReq = function(req, res){
    var name = req.query["name"]; 
    var request = req.query["request"]; 
    if(name == null || request == null){
        res.sendStatus(404);
        return; 
    }
    con.acceptRequest(data, name, request).then(ans => 
        con.communicate( ans[0].token, ans[1])
    )
    .then((resp) =>{
        res.json(resp); 
    })
    .catch((err) =>{
        res.sendStatus(500); 
    })
}


/**
 * The senior who accepcts a volunteer will call this method. It will communicate to the volunteer his data so 
 * that he can fulfill the request. 
 */
module.exports.acceptVol = function(req, res){
    var vol = req.query["vol"]; 
    var req = req.query["req"]; 
    if(vol == null || req == null) {
        res.sendStatus(404); 
        return; 
    }
   
    con.acceptVol(data, vol, req)
    .then(ans => {
       var combine = {
           reqData: ans[0], 
           custData: ans[2]
       }; 
        con.communicate(ans[1].token, combine); 
    })
    .then((resp) =>{
        res.json(resp); 
    })
    .catch((err) =>{
        res.sendStatus(500); 
    })
}

