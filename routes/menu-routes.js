const express = require('express');

const router = express.Router();

const menuController = require('../controllers/menu-controller');

// Register our routes
router.use(menuController.initLocalsData);

// Mount middleware to retrieve category data
// Include catSlug route parameter in path to retrieve this value in the middleware function
router.use("/:catSlug", menuController.getCategoryData);

// Get all menu items in a category
router.get("/:catSlug", menuController.getMenuByCategoryData, menuController.renderMenuByCategory);

// Get a single menu item by id
router.get("/:catSlug/:itemSlug", menuController.getMenuByCategoryData, menuController.getMenuItemData,  menuController.renderMenuItem);

module.exports = router;