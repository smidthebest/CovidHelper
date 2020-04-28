module.exports = function(app) {
    var contr = require("./controller.js"); 

    app.route("/request")
    .post(contr.addReq)
    .get(contr.getReq); 

    app.route("/volunteers")
    .get(contr.getVolunteers); 

    app.route("/customers")
    .get(contr.getCustomers); 
    
}