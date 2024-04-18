const express = require('express');

const router = express.Router();

const lotrController = require('../controllers/lotr-controller');

router.get("/books", lotrController.getBooks);

router.get("/movies", lotrController.getMovies, lotrController.renderMovies);

router.get("/characters", lotrController.getCharacters);

module.exports = router;