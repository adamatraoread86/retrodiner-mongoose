const Category = require("../models/mongoose/category-model");
const MenuItem = require("../models/mongoose/menu-item-model");

// ***********  DATA INITIALIZATION FUNCTIONS ***************

exports.initLocalsData = (req, res, next) => {
  res.locals.data = {};
  next();
}

// ***********  DATA RETRIEVAL FUNCTIONS ***************

// Retrieves data for all menu categories (but not the data for items within each category)
exports.getCategoryData = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.locals.data.categories = categories;
    next();
  } catch (error) {
    next(error);
  }
};

// Retrieves all data for a single category by the category slug, including data for items within the category
exports.getMenuByCategoryData = async (req, res, next) => {
  try {
    const catSlug = req.params.catSlug;
    const menuData = await Category.findOne({ catSlug: catSlug }).populate('items');
    res.locals.data.categoryData = menuData;
    next();
  } catch (error) {
    next(error);
  }
};

// Retrieves all data for a single item by the item slug
exports.getMenuItemData = async (req, res, next) => {
  try {
    const itemSlug = req.params.itemSlug;
    const itemData = await MenuItem.findOne({ itemSlug: itemSlug });
    res.locals.data.itemData = itemData;
    next();
  } catch (error) {
    next(error);
  }
};

// Retrieves the full menu data, including item data, for all categories
exports.getFullMenuData = async (req, res, next) => {
  try {   
    const menuData = await Category.find().populate('items');
    res.locals.data.menuData = menuData;
    next();
  } catch (error) {
    next(error);
  }
};


// ***********  VIEW RENDERING FUNCTIONS ***************

// renders the menu.ejs view
exports.renderMenuByCategory = (req, res, next) => {
  try {
    res.render("menu", {
      pageTitle: "Menu",
      items: res.locals.data.categoryData.items,
      category: res.locals.data.categoryData,
      categories: res.locals.data.categories
    });
  } catch (error) {
    next(error);
  }
}

// renders the menu-item.ejs view
exports.renderMenuItem = (req, res, next) => {
  try {
   
    res.render("menu-item", {
      pageTitle: res.locals.data.itemData.itemName,
      item: res.locals.data.itemData,
      category: res.locals.data.categoryData,
      categories: res.locals.data.categories
    });
  } catch (error) {
    next(error);
  }
}






// // Middleware function to retrieve categories and identify selected category
// exports.getCategories = async (req, res, next) => {
//   console.log("In get categories!");
//   // Retrieve the catSlug
//   const catSlug = req.params.catSlug;

//   // Create try block to handle risky code
//   try {
//     // Get a list of all the categories
//     // Store the data in res.locals to make it accessible to the next handler function and views
//     res.locals.categories = await Category.find();
//     console.log("Categories from controller are: ", res.locals.categories);

//     res.locals.category = res.locals.categories.find(
//       (item) => item.catSlug === catSlug
//     );
//     console.log("Selected Category from controller is: ", res.locals.category);

//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// // Async/await version of getMenu
// exports.getMenu = async (req, res, next) => {
//   // Create try block to handle risky code
//   try {
//     // Retrieve the menu items in the selected Category
//     const fullCategoryData = await res.locals.category.populate("items");
//     const items = fullCategoryData.items;

//     console.log("Items are: ", items);

//     if (items) {
//       res.render("menu", {
//         pageTitle: "Menu",
//         items: items,
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getMenuItem = async (req, res, next) => {
//   // Retrieve the parameter values from req.params

//   const itemSlug = req.params.itemSlug;

//   try {
//     //Get the menu item
//     // const item = await MenuItem.findOne({
//     //   where: { itemSlug: itemSlug },
//     // });
//     const item = await MenuItem.findOne({ itemSlug: itemSlug });
//     console.log("Item is: ", item);
//     if (item) {
//       res.render("menu-item", {
//         pageTitle: item.itemName,
//         item: item,
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };
