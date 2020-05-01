
let db = require("./dbConnect.js"); 
db.DbConnect.setUpDB(); 
var data = db.DbConnect.database();
var con = new db.DbConnect(); 

module.exports.getAll = function(req, res){
    con.getDb(data, req.params.dbName).then((dict) =>{
        res.json(dict); 
    })
    .catch((err) =>{
        console.log(err); 
        res.sendStatus(500); 
    })
}

module.exports.getId = function(req, res){
    con.getDoc(data, req.params.dbName, req.params.docId).then((dict) =>{
        res.json(dict); 
    })
    .catch((err) =>{
        console.log(err); 
        res.sendStatus(500); 
    })
}

module.exports.addDoc = function(req, res){
   
    con.addDoc(data, req.query, req.params.dbName,  req.params.docId)
    .then((resp) =>{
        res.json(resp); 
    })
    .catch((err) =>{
        console.log(err); 
        res.sendStatus(500); 
    })
}

module.exports.updateDoc = function(req, res){
    con.updateDoc(data, req.params.dbName, req.params.docId, req.query)
    .then((resp) =>{
        res.json(resp); 
    })
    .catch((err) =>{
        console.log(err); 
        res.sendStatus(500); 
    })
}

module.exports.deleteDoc = function(req, res){
    con.deleteDoc(data, req.params.dbName, req.params.docId)
    .then((resp) =>{
        res.json(resp); 
    })
    .catch((err) =>{
        console.log(err); 
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

