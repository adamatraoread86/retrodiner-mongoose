const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blog-controller");

// Register routes

//Initialize res.locals.data

router.use(blogController.initLocalsData);

// Show all blog posts
router.get(
  "/",
  blogController.getAllBlogPostData,
  blogController.getAllCategoriesData,
  blogController.renderBlogPosts
);

// Show a single blog post by slug
router.get(
  "/:slug",
  blogController.getSingleBlogPostData,
  blogController.renderSingleBlogPost
);

// Show all blog posts in a category (by category slug)
router.get(
  "/category/:slug",
  blogController.getSingleCategoryData,
  blogController.getBlogPostsByCategoryData,
  blogController.getAllCategoriesData,
  blogController.renderBlogPosts
);

// Show all blog posts by user (by user id)
router.get(
    "/user/:userId",
    blogController.getBlogPostsByUserData,
    blogController.getAllCategoriesData,
    blogController.renderBlogPosts
  );

module.exports = router;
