//
//  Orders.swift
//  CovidHelper
//
//  Created by Ankith on 4/25/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON
import Firebase

class Order {
    // 1. properties
    // Stripe give token each transaction
    var stripeToken: String?
    var storeId: String?
    var orderDetails: [JSON]?
    var orderDetailDictionaries: [[String: Any]]?
    var address: String?
    

    // 2. inits
    // json if we download frm firebase
    // when dL data from stripe
    
    init(json: JSON) {
        stripeToken = json["stripeToken"].string
        storeId = json["storeId"].string
        address = json["address"].string
        orderDetails = json["orderDetails"].array
        
        //hmmm
    }
    
        // locally initializer
    init(stripeToken: String, storeId: String, orderDetails: [[String: Any]], address: String) {
        self.stripeToken = stripeToken
        self.storeId = storeId
        self.orderDetailDictionaries = orderDetails
        self.address = address
    }
    
    // create method, save to firebase
    func create() {
        let storeNewOrderRef = Database.database().reference().child("stores/\(storeId!)/stores").childByAutoId()
        
        let orderId = storeNewOrderRef.key
        let currentUserId = User.current.id!
        let latestOrderRef = Database.database().reference().child("user/\(currentUserId)/latest-order")
        let store = Cart.currentCart.store!
        let orderDictionary: [String : Any] = [
            "orderId" : orderId,
            "stripeToken" : stripeToken!,
            "store" : store.toDictionary(),
            "orderDetails" : orderDetailDictionaries!,
            "address" : address!,
            "status" : "Preparing",
            "total" : Cart.currentCart.getTotal(),
            "customer" : User.current.toDictionary()
            
        ]
        
        //Save USer's latest order
        latestOrderRef.setValue(orderDictionary)
        
        //Save stores new order
        storeNewOrderRef.setValue(orderDictionary)
        
    }
    
    // 3. get latest order
    class func getLatestOrder(completion: @escaping (JSON) -> Void)
    {
        let currentUserId = User.current.id!
        let latestOrderRef = Database.database().reference().child("users/\(currentUserId)/latest-order")
        latestOrderRef.observeSingleEvent(of: .value) { (snapshot) in
            let json = JSON(snapshot.value)
            completion(json)
        }
    }
}
