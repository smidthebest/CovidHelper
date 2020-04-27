//
//  CartItem.swift
//  CovidHelper
//
//  Created by Ankith on 4/27/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import Foundation

class CartItem {
    
    var quantity : Int = 1
    var grocery : Grocery
    
    
    init(grocery: Grocery, quantity: Int ) {
        self.grocery = grocery
    }
}
