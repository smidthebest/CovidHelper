//
//  GroceryCell.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import UIKit
import Alamofire

class GroceryCell : UITableViewCell
{
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var thumbnailImageView: UIImageView!
    @IBOutlet weak var priceLabel: UILabel!

    var grocery: Grocery! {
        didSet {
            self.updateUI()
            
        }
    }
    
    func updateUI()
    {
        nameLabel.text = grocery.name
        descriptionLabel.text = grocery.description

    

        if let price = grocery.price {
            priceLabel.text = "USD \(price)"
        }

        
        let imageURL = URL(string: grocery.imageURL!)
        AF.request(imageURL!).responseData { (responseData) in
            DispatchQueue.main.async {
                if let imageData = responseData.data {
                    self.thumbnailImageView.image = UIImage(data: imageData)
                }

            }
        }
    
}
}

