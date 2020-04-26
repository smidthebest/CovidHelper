//
//  Store.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import Foundation
import SwiftyJSON
import Firebase


class Store {
    var id: String?
    var name: String?
    var address: String?
    var logoURL: String?
    var phone: String?
    var type: String?
    
    //from swifty json
    init(json: JSON)
    {
        id = json["id"].string
        name = json["name"].string
        address = json["address"].string
        logoURL = json["logoURL"].string
        phone = json["phone"].string
        type = json["type"].string
    }
    
    
    //create reference
    class func getStores(completion: @escaping ([Store]) -> Void)
    {
        let storesRef = Database.database().reference().child("stores")
        storesRef.observeSingleEvent(of: .value) { (snapshot) in
            var stores = [Store]()
            
            //data for restos to use from
            for childSnapshot in snapshot.children {
                let value = (childSnapshot as! DataSnapshot).value
                let json = JSON(value)
                stores.append(Store(json: json))
                
            }
            
            completion(stores)
        }
        
    }
    
    func toDictionary() -> [String : Any]
    {
        return [
            "id" : id!,
            "name" : name!,
            "address" : name!,
            "logoURL" : logoURL!,
            "phone" : phone!
            
            
        ]
    }
    
}
