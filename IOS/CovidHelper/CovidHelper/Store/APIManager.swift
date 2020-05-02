//
//  APIMAnager.swift
//  CovidHelper
//
//  Created by Ankith on 5/1/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON

class APIManager
{
    static let shared = APIManager()
    var baseURLString: String? = "https://covidhelper-45bda.firebaseio.com"
    var baseURL : URL {
        if let urlString = self.baseURLString, let url = URL(string: urlString) {
            return url
        } else {
            fatalError()
        }
        
    }
    
    // Create new order
    func createOrder(stripeToken: String, completion: @escaping (JSON) -> Void)
    {
        // generate item details json

        let cartItems = Cart.currentCart.items
        let cartItemsJSONArray = cartItems.map { item in
            return [
                "grocery-id" : item.grocery.id!,
                "grocery-img" : item.grocery.imageURL!,
                "grocery-description" : item.grocery.description!,
                "grocery-price" : item.grocery.price!,
                "grocery-name" : item.grocery.name!,
                "quantity" : item.quantity,
                "subtotal" : item.grocery.price! * Double(item.quantity)
            ]
        }
        
        // create params for order
        let params: [String : Any] = [
            "access_token" : "",
            "stripe_token" : stripeToken,
            "store_id" : "\(Cart.currentCart.store!.id!)",
            "address" : Cart.currentCart.address!,
            "total" : Cart.currentCart.getTotal()
        ]
        
        
        // send post request to backend
        let url = self.baseURL.appendingPathComponent("createorder")
        let newOrder = Order(stripeToken: stripeToken, storeId: Cart.currentCart.store!.id!, orderDetails: cartItemsJSONArray, address: Cart.currentCart.address!)
        // For firebase
        newOrder.create()
        

        // Charge the user for this order instantaneously
        AF.request(url, method: .post, parameters: params).validate(statusCode: 200..<300).responseString { response in
            switch response.result {
            case .success(let value):
                let jsonData = JSON(value)
                completion(jsonData)
            case .failure(let error):
                print("There's Error!", error )
                completion(JSON.null)
            }
            
            
        }
    }
}

