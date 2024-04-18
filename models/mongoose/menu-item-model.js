const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

// Schema defines what the object should look like in database
const menuItemSchema = new Schema({
    itemName: {
        type: String,
        required: true,
        set: function(value) {
            // Set the slug
            this.itemSlug = slugify(value, {lower: true, trim: true})
            // return the value that should be used for the name property
            return value;
        }
    },
    itemDescription: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    },
    itemSlug: {
        type: String,
        required: true
    }
    
})

// Model implements the schema and provides functions for working with the objects
module.exports = mongoose.model('MenuItem', menuItemSchema, "menuitems");