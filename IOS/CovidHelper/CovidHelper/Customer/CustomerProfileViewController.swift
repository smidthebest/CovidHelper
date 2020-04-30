//
//  VolunteerProfile.swift
//  CovidHelper
//
//  Created by Ankith on 4/29/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import UIKit
import Firebase

class CustomerProfileViewController: UIViewController {
    
    @IBOutlet weak var Logout: UIButton!
    @IBAction func logOutTapped(_ sender: Any) {

        let firebaseAuth = Auth.auth()
        do {
            try firebaseAuth.signOut()
        } catch let signOutError as NSError {
            print ("Error signing out: %@", signOutError)
        }
        let storyboard = UIStoryboard(name: "CustomerProfileViewController", bundle: nil)

        let initialViewController = storyboard.instantiateViewController(withIdentifier: "SignInViewController")

        self.present(initialViewController, animated: false)
    }

}
