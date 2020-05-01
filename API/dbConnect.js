
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


    async addDoc(db, data, dbName, name){
        var ret; 
        let newReq = db.collection(dbName).doc(name); 
        await newReq.set(data)
        .then((data) =>{
          ret = data; 
        })
        .catch((err) => {
            throw(err)
        }); 

        return ret; 
        
    }

    async getDoc(db, name, id){
        var data; 
        await db.collection(name).get(id)
        .then((snapshot) =>{
            snapshot.forEach((doc) =>{
                if(doc.id == id){
                    data = doc.data(); 
                }
            })
        })
        .catch((err) =>{
            throw(err); 
        })

        
        return data; 
    }

    async acceptRequest( db, name, request){
      
        let volData = this.getDoc(db, "volunteers", name);
        let reqData = this.getDoc(db, "requests", request);

        await volData; 
        await reqData; 

        
        return [reqData, volData];
    }

    async acceptVol(db, vol, req){
        let t =  this.getDoc(db, "volunteers", vol); 
        let reqData = await this.getDoc(db, "requests", req); 
        let t1 = this.getDoc(db, "customers", reqData.customer); 
       
        let volData = await t; 
        let custData = await t1; 
        
       
        return [reqData, volData, custData]; 
    }

    async updateDoc(db, dbName, docId, data){
        var ret; 
        await db.collection(dbName).doc(docId).update(data)
        .then((data) =>{
            ret = data; 
        }); 

        return ret; 
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
            throw error;  
        });
    }

   

}

module.exports = {
    DbConnect : DbConnect
}

