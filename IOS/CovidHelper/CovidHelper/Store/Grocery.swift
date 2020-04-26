//
//  Grocery.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import Foundation

class Grocery {
    var id: String?
    var description: String!
    var name: String?
    var imageURL: String?
    var price: Double?
    
    class func getGroceries(withStoreId storeId: String, completion: @escaping ([Grocery]) -> Void) {
        
    }
}
