const BlogPostCategory = require("../models/mongoose/blog-post-category-model");
const BlogPost = require("../models/mongoose/blog-post-model");

// ***********  DATA INITIALIZATION FUNCTIONS ***************

exports.initLocalsData = (req, res, next) => {
    res.locals.data = {};
    next();
  }

// **************  DATA RETRIEVAL FUNCTIONS ******************

// Retrieve data for all categories
exports.getAllCategoriesData = async (req, res, next) => {
    try {
        res.locals.data.blogPostCategories = await BlogPostCategory.find();
        next();
    } catch (error) {
        next(error);
    }

}

// Retrieve data for a single category by slug
exports.getSingleCategoryData = async (req, res, next) => {
    const slug = req.params.slug;
    try {
        res.locals.data.blogPostCategory = await BlogPostCategory.findOne({slug: slug});
        next();
    } catch (error) {
        next(error);
    }

}

// Retrieve data for all blog posts
exports.getAllBlogPostData = async (req, res, next) => {
    try {
        res.locals.data.blogPosts = await BlogPost.find().populate("categories").populate("user").sort({ date: -1 });
        next();
    } catch (error) {
        next(error);
    }

}

// Retrieve data for a single blog post by slug
exports.getSingleBlogPostData = async (req, res, next) => {
    const slug = req.params.slug;
    try {
        res.locals.data.blogPost = await BlogPost.findOne({slug: slug}).populate("categories").populate("user");
        next();
    } catch (error) {
        next(error);
    }
}

// Retrieve data for all blog posts in a specific category (category retrieved by a previous function)
exports.getBlogPostsByCategoryData = async (req, res, next) => {
    const {blogPostCategory} = res.locals.data;
    if (blogPostCategory) {
        try {
            res.locals.data.blogPosts = await BlogPost.find({categories: blogPostCategory._id}).populate("categories").populate("user").sort({ date: -1 });
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next(error);
    }
    
}

// Retrieve data for all blog posts by a specific user
exports.getBlogPostsByUserData = async (req, res, next) => {
    const userId = req.params.userId;
    if (userId) {
        try {
            res.locals.data.blogPosts = await BlogPost.find({user: userId}).populate("categories").populate("user").sort({ date: -1 });
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next(error);
    }
    
}


// **************  VIEW RENDERING FUNCTIONS ********************


// Render blog view with data for all blog posts
exports.renderBlogPosts = (req, res, next) => {
    const {blogPosts, blogPostCategories} = res.locals.data;
    if (blogPosts && blogPostCategories) {
        res.render("blog/blog", {pageTitle: "Blog", blogPosts: blogPosts, blogPostCategories: blogPostCategories});
    }
    else {
        next(new Error("Unable to retrieve Blog Data."))
    }
    
}

// Render blog-single view with data for a single blog post
exports.renderSingleBlogPost = (req, res, next) => {
    const {blogPost} = res.locals.data;
    if (blogPost) {
        res.render("blog/blog-single", {pageTitle: blogPost.title, blogPost: blogPost});
    }
    else {
        next(new Error("Unable to retrieve Blog Data."))
    }
}