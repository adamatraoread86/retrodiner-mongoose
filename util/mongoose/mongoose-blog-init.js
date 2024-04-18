const mongoose = require("mongoose");

// Import models (change path as needed)
const BlogPostCategory = require("../../models/mongoose/blog-post-category-model");
const BlogPost = require("../../models/mongoose/blog-post-model")

// Import data (change path as needed)
const BlogPostCategoryData = require("./blogPostCategories-mongoose.json");
const BlogPostData = require("./blogPosts-mongoose.json");



mongoose
  .connect(
    "mongodb+srv://dbo:dbpassword@cluster0.hahy7km.mongodb.net/retrodiner-mongoose?retryWrites=true&w=majority&appName=Cluster0" // Put your connection string here
  )
  .then(() => {
    // Bulk create all menu item data
    return BlogPostCategory.create(BlogPostCategoryData);
  })
  .then((result) => {
    // Log menu item data
    console.log("Inserted catgory data: ", result);
    // Bulk create all category data
    return BlogPost.create(BlogPostData);
  })
  .then((result) => {
    // Log blog post data
    console.log("Inserted blog post data: ", result);
  })
  .catch((err) => {
    console.log(err);
  });
