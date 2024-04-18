const axios = require("axios");

exports.getBooks = async (req, res, next) => {
    //Retrieve all books form lotr api
   const response = await axios.get("https://the-one-api.dev/v2/book");
   res.status(200).json(response)
}