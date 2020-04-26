//
//  StoreCells.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import UIKit
import Alamofire


class StoreCell : UITableViewCell
{
    @IBOutlet weak var logoImageView: UIImageView!
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var addressLabel: UILabel!
    @IBOutlet weak var restoTypeLabel: UILabel!
    @IBOutlet weak var ratingLabel: UILabel!
    
    
    
    var store: Store! {
        didSet {
            self.updateUI()
        }
    }
    
    func updateUI()
    {
        self.restoTypeLabel.text = store.type
        self.addressLabel.text = store.address
        self.nameLabel.text = store.name
        self.logoImageView.image = nil
        if let imageURL = URL(string: store.logoURL!) {
            Alamofire.request(imageURL).responseData { (responseData) in
                DispatchQueue.main.async {
                    if let imageData = responseData.data {
                        self.logoImageView.image = UIImage(data: imageData)
                        
                    }
                }
            }
        
        
    }
    
}



}
