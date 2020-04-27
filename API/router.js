module.exports = function(app) {
    var contr = require("./controller.js"); 

    console.log(contr.getVolunteers()); 
    contr.addReq(); 

    app.route("/request").post(contr.addReq); 
    
}