//
//  GroceryViewController.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import UIKit
import Alamofire

class GroceryViewController: UITableViewController
{
    @IBOutlet weak var storeNameLabel: UILabel!
    @IBOutlet weak var restoBannerImage: UIImageView!
    
    
    //pass the store groceries
    var store: Store!
    var groceries = [Grocery]()

    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //self.navigationController?.isNavigationBarHidden = true
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.isTranslucent = true
        tableView.rowHeight = 140.0
        title = store.name!
        
        storeNameLabel.text = store.name
        if let imageURL = URL(string: store.logoURL!) {
            Alamofire.request(imageURL).responseData { (responseData) in
                DispatchQueue.main.async {
                    if let imageData = responseData.data {
                        self.restoBannerImage.image = UIImage(data: imageData)
                        
                    }
                }
            }
            
            
        }
        
        getGroceries()
    }
    
    func getGroceries()
    {
        Grocery.getGroceries(withStoreId: store.id!) { (groceries) in
            DispatchQueue.main.async {
                self.groceries = groceries
                self.tableView.reloadData()
                
            }
        }
    }
}

//Mark: UITableview Datasource
extension GroceriesViewController
{
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return groceries.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "GroceryCell", for: indexPath) as! GroceryCell
        cell.grocery = self.groceries[indexPath.row]
        
        return cell
    }
}
