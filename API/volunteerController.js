
let db = require("./dbConnect.js"); 
db.setUpDB(); 
var data = db.getDb(); 
exports.getVolunteers = function(){
    
    var d; 
    db.getVolunteers(data).then((dict) => {
        d = dict; 
        console.log(dict); 
    }); 

    console.log(d); 

    
    
    



}