var express = require("express"); 
var app = express(); 

var contr = require("./volunteerController.js"); 
contr.getVolunteers(); 

app.post("/request", function(req, res){
    
}); 

