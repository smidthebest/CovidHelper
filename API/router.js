module.exports = function(app) {
    var contr = require("./controller.js"); 

    app.route("/request")
    .post(contr.postReq)
    .get(contr.getReq); 

    app.route("/volunteers")
    .get(contr.getVolunteers); 

    app.route("/customers")
    .get(contr.getCustomers);
    
    app.route("/acceptReq")
    .post(contr.acceptReq); 

    app.route("/acceptVol")
    .post(contr.acceptVol); 
    
}