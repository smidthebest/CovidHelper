//
//  CartItemCell.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

class CartItemCell: UITableViewCell {
    @IBOutlet weak var quantityLabel: UILabel!
    @IBOutlet weak var groceryNameLabel: UILabel!
    @IBOutlet weak var grocerySubtotalLabel: UILabel!
    
    var cartItem: CartItem! {
        didSet {
            self.updateUI()
        }
    }
    
    func updateUI()
    {
        quantityLabel.text = String(cartItem.quantity)
        groceryNameLabel.text = cartItem.grocery.name
        grocerySubtotalLabel.text = String(Double(cartItem.quantity) * cartItem.grocery.price!)
    }
}
