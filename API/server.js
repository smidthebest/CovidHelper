var express = require("express"); 
var app = express(); 
const contr = require("./volunteerController.js"); 
contr.getVolunteers(); 


app.get("/", function(req, res){

}); 

