//
//  Payment.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import UIKit
import Stripe
import SwiftyJSON

class PaymentViewController : UIViewController
{
    @IBOutlet weak var cardTextField: STPPaymentCardTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        title = "Payment"
    }
    
    @IBAction func placeOrder()
    {
        // get the latest order
        Orders.getLatestOrder { (json) in
            DispatchQueue.main.async {
                if json == JSON.null || json["status"].string == "Delivered" {
                    // if the latest order is complete || nil
                    // then create a new order
                    let cardParams = self.cardTextField.cardParams
                    let paymentMethodParams = STPPaymentMethodParams(card: cardParams, billingDetails: nil, metadata: nil)
                    STPAPIClient.shared().createPaymentMethod(with: paymentMethodParams, completion: { (token, error) in
                        if let error = error {
                            print("Error stripe generate card token", error)
                        } else if let stripeToken = token {
                            
                            APIManager.shared.createOrder(stripeToken: stripeToken.stripeId, completion: { (json) in
                                Cart.currentCart.reset()
                                self.performSegue(withIdentifier: "ShowOrderViewController", sender: self)
                            })
                            
                        }
                    })
                } else {
                    // else show an alert that they already have order on way
                    let alertVC = UIAlertController(title: "Order is on the way", message: "You have existing order isn't completed yet", preferredStyle: .alert)
                    let cancelAction = UIAlertAction(title: "OK", style: .cancel, handler: nil)
                    
                    let okAction = UIAlertAction(title: "Go to the order", style: .default, handler: { (action) in
                        self.performSegue(withIdentifier: "ShowOrderViewController", sender: self)
                    })
                    alertVC.addAction(cancelAction)
                    alertVC.addAction(okAction)
                    
                    self.present(alertVC, animated: true, completion: nil)
                }
                
            }
        }
        
    }
    
}


