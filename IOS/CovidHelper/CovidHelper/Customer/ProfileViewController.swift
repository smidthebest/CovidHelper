//
//  ProfileViewController.swift
//  CovidHelper
//
//  Created by Arnav Reddy on 5/1/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import UIKit
import Firebase
class ProfileViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    @IBAction func logOutPressed(_ sender: Any) {
        let firebaseAuth = Auth.auth()
        do {
            try firebaseAuth.signOut()
            print("success: signed out")
        } catch let signOutError as NSError {
            print ("failed: error signing out: %@", signOutError)
        }
        let SignInTab = storyboard?.instantiateViewController(withIdentifier: "SignInPage") as! ViewController
        present(SignInTab, animated: true, completion: nil)
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
