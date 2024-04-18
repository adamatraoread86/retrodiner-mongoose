const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

// Schema for blog post categories
const blogPostCategorySchema = new Schema({
    name : {
        type: String,
        required: true,
        set: function(value) {            
            this.slug = slugify(value, {lower: true, trim: true});
            return value;
        }
    },
    slug : {
        type: String,
        required: true
    }
});

// Create a model based on the schema
module.exports = mongoose.model("BlogPostCategory", blogPostCategorySchema, "blogpostcategories");