//
//  StoreViewController.swift
//  CovidHelper
//
//  Created by Ankith on 4/26/20.
//  Copyright © 2020 Arnav Reddy. All rights reserved.
//

class StoreListingTableViewController: UITableViewController
{
    
    @IBOutlet weak var SearchBar: UISearchBar!
    
    
    // empty array of stores
    
    var storess = [Store]()
    
    
    var filteredStoress = [Store]()
    let activityIndicatorView = UIActivityIndicatorView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // tell search bar this class is delegate
        
        SearchBar.delegate = self
        
        getStores()
        
    }
    
    
    // fetch data
    func getStores()
    {
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
    
    func showActivityIndicator()
    {
        activityIndicatorView.frame = CGRect(x: 0, y: 0, width: 40, height: 40)
        activityIndicatorView.center = tableView.center
        activityIndicatorView.activityIndicatorViewStyle = .whiteLarge
        activityIndicatorView.color = .red
        
        view.addSubview(activityIndicatorView)
        activityIndicatorView.startAnimating()
    }
    
    func hideActivityIndicator()
    {
        activityIndicatorView.stopAnimating()
        activityIndicatorView.removeFromSuperview()
    }
    
    // Mark: Navigation
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?)
    {
        if segue.identifier == "ShowMealsViewController" {
        let mealsVC = segue.destination as! MealsViewController
            //should be "" empty string, not nil to avoid fatal error
        if SearchBar.text != "" {
            mealsVC.restaurant =
                self.filteredRestaurants[self.tableView.indexPathForSelectedRow!.row]
        } else {
            mealsVC.restaurant =
            self.restaurants[self.tableView.indexPathForSelectedRow!.row]
        }
    }
}

}
// Mark: UITableViewDataSource
//implement UITableView data source

extension RestaurantListingTableViewController
{
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        //not empty thus filtered restos.
        if SearchBar.text != "" {
            return self.filteredRestaurants.count
        }
        
        return restaurants.count
    }
    
    //fetch data
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "RestaurantCell", for: indexPath) as! RestaurantCell
        
       // For FILTER Restaurants
        var restaurant = self.restaurants[indexPath.row]
        
        //search not empty
        if SearchBar.text != "" {
            restaurant = self.filteredRestaurants[indexPath.row]
            
        }
        
        cell.restaurant = restaurant
        cell.selectionStyle = .none //disable grey selection
        
        
        return cell
    }

}

extension RestaurantListingTableViewController : UISearchBarDelegate
{
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        filteredRestaurants = self.restaurants.filter({ (restaurant) -> Bool in
            return restaurant.name?.lowercased().range(of: searchText.lowercased()) != nil
        })
        
        self.tableView.reloadData()
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        searchBar.resignFirstResponder()
    }
}
