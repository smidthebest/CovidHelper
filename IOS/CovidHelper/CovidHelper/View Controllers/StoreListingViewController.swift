//
//  StoreViewController.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

import UIKit
class StoreListingViewController: UITableViewController {
    
    @IBOutlet weak var SearchBar: UISearchBar!
    
    @IBOutlet weak var menuBarButtonItem: UIBarButtonItem!
    
    //empty array of stores
    var stores = [Store]()
    
    
    var filteredStores = [Store]()
    let activityIndicatorView = UIActivityIndicatorView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        menuBarButtonItem.target = self.revealViewController()
        menuBarButtonItem.action = #selector(SWRevealViewController.revealToggle(_: ))
        
        self.view.addGestureRecognizer(self.revealViewController().panGestureRecognizer())
    //tell search bar this class is delegate
        SearchBar.delegate = self
        
        getStores()
        
    }
    
    
    //fetch data
    func getStores() {
        showActivityIndicator()
        
        Store.getStores { (stores) in
            DispatchQueue.main.async {
                self.stores = stores
                self.tableView.reloadData()
                
                self.hideActivityIndicator()
            }
            
        }
    }
    
    // MARK: - Activity Indicator method
    
    func showActivityIndicator() {
        activityIndicatorView.frame = CGRect(x: 0, y: 0, width: 40, height: 40)
        activityIndicatorView.center = tableView.center
        activityIndicatorView.activityIndicatorViewStyle = .whiteLarge
        activityIndicatorView.color = .red
        
        view.addSubview(activityIndicatorView)
        activityIndicatorView.startAnimating()
    }
    
    func hideActivityIndicator() {
        activityIndicatorView.stopAnimating()
        activityIndicatorView.removeFromSuperview()
    }
    
    // Mark: Navigation
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ShowGroceriesViewController" {
        let groceriesVC = segue.destination as! GroceriesViewController
            //should be "" empty string, not nil to avoid fatal error
        if SearchBar.text != "" {
            groceriesVC.store =
                self.filteredStores[self.tableView.indexPathForSelectedRow!.row]
        } else {
            groceriesVC.store =
            self.stores[self.tableView.indexPathForSelectedRow!.row]
        }
    }
}

}
// Mark: UITableViewDataSource
//implement UITableView data source
extension StoreListingViewController {
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        //not empty thus filtered restos.
        if SearchBar.text != "" {
            return self.filteredStores.count
        }
        
        return stores.count
    }
    
    //fetch data
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "StoreCell", for: indexPath) as! StoreCell
        
       // For FILTER Stores
        var store = self.stores[indexPath.row]
        
        //search not empty
        if SearchBar.text != "" {
            store = self.filteredStores[indexPath.row]
            
        }
        
        cell.store = store
        cell.selectionStyle = .none //disable grey selection
        
        
        return cell
    }

}

extension StoreListingViewController : UISearchBarDelegate
{
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        filteredStores = self.stores.filter({ (store) -> Bool in
            return store.name?.lowercased().range(of: searchText.lowercased()) != nil
        })
        
        self.tableView.reloadData()
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        searchBar.resignFirstResponder()
    }
}

