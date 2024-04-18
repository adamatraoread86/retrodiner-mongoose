const axios = require("axios");

const lotrURL= "https://the-one-api.dev/v2"
const lotrKey = "gUHYDbXEQN1DURgsQYh1"

exports.getBooks = async (req, res, next) => {
    //Retrieve all books form lotr api
   const response = await axios.get("https://the-one-api.dev/v2/book");
   res.status(200).json(response.data)
}

exports.getMovies = async (req, res, next) => {
    const response = await axios.get(lotrURL + "/movie", {
        headers: {
            Authorization: "Bearer "+ lotrKey
        }
    });
    res.status(200).json(response.data);
}