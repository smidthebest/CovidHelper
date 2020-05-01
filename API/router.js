module.exports = function(app) {
    var contr = require("./controller.js"); 

    app.route("/acceptReq")
    .post(contr.acceptReq); 

    app.route("/acceptVol")
    .post(contr.acceptVol); 

    app.route("/db/:dbName")
    .get(contr.getAll); 
    
    app.route("/doc/:dbName/:docId")
    .get(contr.getDoc)
    .post(contr.addDoc)
    .put(contr.updateDoc)
    .delete(contr.deleteDoc); 

   
    
}