const Sequelize = require('sequelize');
const slugify = require('slugify');

const sequelize = require('../../util/database');

const MenuItem = sequelize.define('menuitem', {
    // Define attributes of a category
    itemId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    itemName: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            // Set the catName to the value passed in
            this.setDataValue('itemName', value);
            this.setDataValue('itemSlug', slugify(value, {lower: true, trim: true}));
        }
    },
    itemDescription: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    itemPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    itemImage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    itemSlug : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = MenuItem;