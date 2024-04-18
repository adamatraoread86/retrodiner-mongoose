// Get access to the database

const getDb = require('../../util/mongodb/database-mongo').getDb
// const db = require("../util/database");

// New menu class with data manipulation functions

class Contact {

  // Function that retrieves all categories from the database
  static insertContact(data) {
    const db = getDb();
    return db.collection('contacts').insertOne(data)
    .then((result) => {
      console.log("Result is: ", result);
      return result;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  
}

module.exports = Contact;
