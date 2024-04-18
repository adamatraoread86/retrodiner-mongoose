const Sequelize = require('sequelize');
const slugify = require('slugify');

const sequelize = require('../../util/sequelize/database');

const Category = sequelize.define('category', {
    // Define attributes of a category
    catId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    catName: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            // Set the catName to the value passed in
            this.setDataValue('catName', value);
            this.setDataValue('catSlug', slugify(value, {lower: true, trim: true}));
        }
    },
    catImage: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    catSlug : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;