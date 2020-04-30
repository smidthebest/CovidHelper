module.exports = function(app) {
    var contr = require("./controller.js"); 

    app.route("/request")
    .post(contr.postReq)
    .get(contr.getReq); 

    app.route("/request/:reqId")
    .get(contr.getReqById); 

    app.route("/volunteers")
    .get(contr.getVolunteers); 

    app.route("/volunteers/:volId")
    .get(contr.getVolById); 

    app.route("/customers")
    .get(contr.getCustomers);

    app.route("/customers/:cusId")
    .get(contr.getCusById); 
    
    app.route("/acceptReq")
    .post(contr.acceptReq); 

    app.route("/acceptVol")
    .post(contr.acceptVol); 
    
}