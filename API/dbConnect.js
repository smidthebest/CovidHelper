
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

    static database(){
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
        await newReq.set(data)
        .then((data) =>{
           return new Promise((resolve, reject) =>{
                resolve(data); 
           }); 
        }); 
        
    }

    async acceptRequest(db , name, request){
      
        var reqData, volData; 
        let temp1 =  db.collection("requests").get()
        .then((snapshot) =>{
            snapshot.forEach((doc) =>{
                if(doc.id == request){  
                    reqData= doc.data(); 
                }
            }) 
        })
        .catch((err) =>{
            reject(err); 
        }); 
           
        let temp2 = db.collection("volunteers").get()
        .then((snapshot) =>{
           snapshot.forEach((doc) =>{
                if(doc.id == name){  
                    volData= doc.data(); 
                }
            }) 
        })
        .catch((err) =>{
            reject(err); 
        }); 

        await temp1; 
        await temp2; 

        return [reqData, volData];
    }

    async communicate(token, data){
        var message = {
            data: data, 
            token: token
        }

        await DbConnect.admin.messaging().send(message)
        .then((response) => {
            return response; 
        })
        .catch((error) => {
            console.log(error); 
            throw error;  
        });
    }

}

module.exports = {
    DbConnect : DbConnect
}

