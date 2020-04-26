
let db = require("./dbConnect.js"); 
db.setUpDB(); 
var data = db.getDb(); 
exports.getVolunteers = function(){
    
    db.getVolunteers(data).then((dict) => {
        console.log(dict); 
    }); 


}