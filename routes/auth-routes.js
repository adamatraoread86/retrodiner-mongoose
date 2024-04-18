const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth-controller');

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.authUser, authController.loginWebApp);

router.post("/signup", authController.postSignup);

router.get("/logout", authController.getLogout);

module.exports = router;