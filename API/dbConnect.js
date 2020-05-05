
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

    /**
     * 
     * @param {the database instance} db 
     * @param {the name of th db to be retrieved} name 
     */
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

    /**
     * 
     * @param {the database instance} db 
     * @param {the data to be added to the new document} data 
     * @param {the database to which the document is being added to} dbName 
     * @param {the name of the new document} name 
     */
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

    /**
     * 
     * @param {the database instance} db 
     * @param {the name of the database to which you are getting from} name 
     * @param {the doc id of the document to be retrieved} id 
     */
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

    /**
     * 
     * @param {the database instance} db 
     * @param {the name of the volunteer which is being accepted} name 
     * @param {the name of the request which is being accepted} request 
     */
    async acceptRequest( db, name, request){
      
        let volData = this.getDoc(db, "volunteers", name);
        let reqData = this.getDoc(db, "requests", request);

        await volData; 
        await reqData; 

        
        return [reqData, volData];
    }

    /**
     * 
     * @param {the database instance} db 
     * @param {the volunteer which is being accepted by the customer} vol 
     * @param {the request to which they are accepting} req 
     */
    async acceptVol(db, vol, req){
        db.collection("volunteers").doc(vol).update({state: "in progress"}); 
        let t =  this.getDoc(db, "volunteers", vol); 
        let reqData = await this.getDoc(db, "requests", req); 
        db.collection("requests").doc(req).update({state: "in progress"}); 
        let t1 = this.getDoc(db, "customers", reqData.customer); 
       
        let volData = await t; 
        let custData = await t1; 
        
       
        return [reqData, volData, custData]; 
    }

    /**
     * 
     * @param {the database instance} db 
     * @param {the name of database to be updated} dbName 
     * @param {the name of the document to be updated} docId 
     * @param {the data that will be entered in} data 
     */
    async updateDoc(db, dbName, docId, data){
        var ret; 
        await db.collection(dbName).doc(docId).update(data)
        .then((data) =>{
            ret = data; 
        }); 

        return ret; 
    }    

    /**
     * 
     * @param {the database} db 
     * @param {the name of the db from which to delete from }dbName 
     * @param {the doc to be deleted }docId 
     */
    async deleteDoc(db, dbName, docId){
        var ret; 
        await db.collection(dbName).doc(docId).delete()
        .then((data) =>{
            ret = data; 
        }); 
       
        return ret; 
    }

    /**
     * 
     * @param {* the token of the client to communicate to} token 
     * @param {* the data to communicate to the client} data 
     */
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

    async compReq(db, vol, req, cust){
       
        let volData = this.getDoc(db, "volunteers", vol);
        let reqData = this.getDoc(db, "requests", req); 
        let custData = this.getDoc(db, "customers", cust); 

        await volData; 
        await reqData; 
        await custData; 

        let t1 = this.updateDoc(db, "volunteers", vol, {state: "free"}); 
        let t2 = this.deleteDoc(db, "requests", req );
      
        let t3 = this.communicate(custData["token"], {vData: volData, reqData: reqData}); 

        await t3

        return t3; 

    }
}

module.exports = {
    DbConnect : DbConnect
}

