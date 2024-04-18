const express = require('express');

const router = express.Router();

const lotrController = require('../controllers/lotr-controller');

router.get("books", lotrController.getBooks)


module.exports = router;