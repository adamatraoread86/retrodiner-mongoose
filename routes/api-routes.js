const express = require('express');

const router = express.Router();

const apiController = require('../controllers/api-controller');
const menuController = require('../controllers/menu-controller');
const authController = require('../controllers/auth-controller');

router.use(menuController.initLocalsData);

router.post("/auth", authController.authUser, apiController.getToken);

router.get("/menu/categories", menuController.getCategoryData, apiController.sendApiJson);
router.get("/menu", apiController.verifyToken, menuController.getFullMenuData, apiController.sendApiJson);

module.exports = router;