const mongoose = require("mongoose");

// Import models (change path as needed)
const MenuItem = require("../../models/mongoose/menu-item-model");
const Category = require("../../models/mongoose/category-model");

// Import data (change path as needed)
const MenuItemData = require("./menuitems-mongoose.json");
const CategoryData = require("./categories-mongoose.json");

//  Define variables for holding menuitems and categories arrays
let menuitems, categories;

mongoose
  .connect(
    "mongodb+srv://dbo:dbpassword@cluster0.hahy7km.mongodb.net/retrodiner-mongoose?retryWrites=true&w=majority&appName=Cluster0" //Put your connection string here
  )
  .then(() => {
    // Bulk create all menu item data
    return MenuItem.create(MenuItemData);
  })
  .then((result) => {
    // Log menu item data
    console.log("Inserted menu item data: ", result);
    // Save data in variable for later use
    menuitems = result;
    // Bulk create all category data
    return Category.create(CategoryData);
  })
  .then((result) => {
    // Log category data
    console.log("Inserted category data: ", result);
      // Save data in variable for later use
    categories = result;
  })
  .then(() => {
    // Iterate through categories and menu items to add item ids to their respective category (four items per category)
    let itemcounter = 0;
    let categorycounter = 1;

    for (let cat of categories) {
      while (itemcounter < categorycounter * 4) {
        cat.items.push(menuitems[itemcounter]._id);
        itemcounter++;
      }
      // Save updated category to database
      cat.save();
      categorycounter++;
    }
  })
  .catch((err) => {
    console.log(err);
  });
