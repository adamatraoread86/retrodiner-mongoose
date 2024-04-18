// Get access to the database

const getDb = require('../../util/mongodb/database-mongo').getDb
// const db = require("../util/database");

// New menu class with data manipulation functions

class Menu {

  // Function that retrieves all categories from the database
  static fetchAllCategories() {
    const db = getDb();
    return db.collection('menu').find().toArray()
    .then((data) => {
      console.log("Data is: ", data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // Function that retrieves all menu items in a specific category
  static fetchItemsInCategory(catId) {
    return db.execute("SELECT * FROM menuitems WHERE catId = ?", [catId]);
  }
}

module.exports = Menu;
