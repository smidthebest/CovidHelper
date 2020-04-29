//
//  Grocery.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import Foundation
import Firebase
import SwiftyJSON

class Grocery {
    var id: String?
    var description: String!
    var name: String?
    var imageURL: String?
    var price: Double?
    
    init(json: JSON) {
        id = json["id"].string
        name = json["name"].string
        price = json["price"].double
        description = json["description"].string
        imageURL = json["imageURL"].string
        
    }
    
    class func getGroceries(withStoreId storeId: String, completion: @escaping ([Grocery]) -> Void) {
        /*
        let ref = Database.database().reference().child("stores/\(storeId)/groceries")
        ref.observeSingleEvent(of: .value) { (snapshot) in
            var groceries = [Grocery]()
            for childSnapshot in snapshot.children {
                let groceryJSON = JSON((childSnapshot as! DataSnapshot ).value)
                let grocery = Grocery(json: groceryJSON)
                groceries.append(grocery)
            }
            
            completion(groceries)
            
            
        }
 */
    }
 
}
