//
//  Cart.swift
//  CovidHelper
//
//  Created by Ankith on 4/25/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import Foundation

class Cart {
    static let currentCart = Cart()
    
    var store: Store?
    var items = [CartItem]()
    var address: String?
    
    func getTotalQuantity() -> Int {
        var total = 0
        for item in items {
            total += item.quantity
        }
        return total
    }
    
    func getTotal() -> Double {
        var total = 0.0
        for item in items {
            total += Double(item.quantity) * item.grocery.price
        }
        return total
    }
    
    func reset() {
        store = nil
        items.removeAll()
        address = nil
    }
}
