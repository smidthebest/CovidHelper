
module.exports = class DbConnect{
    static #serviceAccount;
    static admin;

    static setUpDB(){
        DbConnect.#serviceAccount = require("/Users/siddharthamishra/Documents/GitHub/CovidHelper/API/covidhelper-45bda-firebase-adminsdk-4ssgh-dfd30a3fc6.json");
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

}

