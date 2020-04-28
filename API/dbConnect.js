
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

     async getDb(db, name){
       
        var dict = {}; 
       await db.collection(name).get() 
       .then((snapshot) => {
            snapshot.forEach((doc) => {
                dict[doc.id] = doc.data(); 
                
            })
           
           
        })
        .catch((err) => {
            throw Error; 
        })
        
        return new Promise((resolve, reject) =>{
            resolve(dict); 
        }); 
        
    }


    async addReq(db, data, num){
        
        let newReq = db.collection("requests").doc("req " + num); 
        //console.log(newReq); 
        await newReq.set(data)
        .then((data) =>{
           return new Promise((resolve, reject) =>{
                resolve(data); 
           }); 
        }); 
        
    }

}

module.exports = {
    DbConnect : DbConnect
}

