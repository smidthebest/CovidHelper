
class DbConnect{
    static #serviceAccount;
    static admin;

    static setUpDB(){
        DbConnect.#serviceAccount = require("./info/covidhelper-45bda-firebase-adminsdk-4ssgh-8cd4cdeb33.json");
        DbConnect.admin = require("firebase-admin");  

        DbConnect.admin.initializeApp({
            credential: DbConnect.admin.credential.cert(DbConnect.#serviceAccount),
            databaseURL: "https://covidhelper-45bda.firebaseio.com"
          });
    }

    static getDb(){
        return DbConnect.admin.firestore(); 
    }

    static async getVolunteers(db){
       
        var dict = {}; 
        let data = await db.collection('volunteers').get() 
       .then((snapshot) => {
            snapshot.forEach((doc) => {
                dict[doc.id] = doc.data(); 
                
            })
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        })
        
        return new Promise((resolve, reject) =>{
            resolve(dict); 
        }); 
        
    }

      addReq(db, data, num){
        
        let newReq = db.collection("requests").doc("req " + num); 
        //console.log(newReq); 
        let newReqData = newReq.set(data).then(() =>{
            console.log(newReq); 
            return true; 
        }); 
        
    }

}

module.exports = {
    DbConnect : DbConnect
}

