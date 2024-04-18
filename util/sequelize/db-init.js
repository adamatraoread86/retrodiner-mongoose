// Import sequelize instance
const sequelize = require('./database');

// Import sequelize models
const Contact = require('../models/contact-model');
const Category = require('../models/category-model');
const MenuItem = require('../models/menu-item-model');

// Import database data
const catData = require('../categories-data.json');
const itemData = require('../menuitems-data.json');

// Define relationship between Category and MenuItem
const catItemForeignKeyConfig = {
    foreignKey: {
        name: 'catId',
        allowNull: false
    }
}

Category.hasMany(MenuItem, catItemForeignKeyConfig);
MenuItem.belongsTo(Category, catItemForeignKeyConfig);


// Sync models to database
sequelize.sync({force: true})
.then((result) => {
    console.log("SUCCESS! ", result);
})
//Bulk insert categories
.then(() => {
    return Category.bulkCreate(catData);
})
.then((catResult) => {
    console.log("Cat result: ", catResult);
    return MenuItem.bulkCreate(itemData);
})
.then((itemResult) => {
    console.log("Item Result: ", itemResult);
})
.catch((err) => {
    console.log("Error!  ", err);
})