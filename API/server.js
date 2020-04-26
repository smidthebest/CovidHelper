var express = require("express"); 
var app = express(); 

let db = require("./dbConnect.js"); 
db.setUpDB(); 
var data = db.getDb(); 

db.getVolunteers(data); 

app.get("/", function(req, res){

}); 

