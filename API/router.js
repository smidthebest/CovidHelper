module.exports = function(app) {
    var contr = require("./controller.js"); 
    
    app.route("/request").post(contr.addReq); 
    
}