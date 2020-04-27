
class DbConnect{
    static #serviceAccount;
    static admin;
     count = 0; 

    static setUpDB(){
        DbConnect.#serviceAccount = require("./covidhelper-45bda-firebase-adminsdk-4ssgh-8cd4cdeb33.json");
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

      addReq(db, data){
        this.count = this.count +1;
        console.log(this.count);  
        let newReq = db.collection("requests").doc("req " + this.count); 
        
        let newReqData = newReq.set(data); 
    }

}

module.exports = {
    DbConnect : DbConnect
}

