var express = require("express"); 
var app = express(); 
var admin = require('firebase-admin');
var serviceAccount = require("/Users/siddharthamishra/Documents/GitHub/CovidHelper/API/covidhelper-45bda-firebase-adminsdk-4ssgh-dfd30a3fc6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://covidhelper-45bda.firebaseio.com"
});

let db = admin.firestore(); 



app.get("/", function(req, res){

}); 

