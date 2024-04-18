const jwt = require("jsonwebtoken");

exports.getToken = (req, res, next) => {
  const { user, passwordsMatch } = res.locals;

  console.log("res.locals data is: ", user, passwordsMatch);

  if (user && passwordsMatch) {
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json({ message: "Token Generated.", data: { token: token } });
  }

  res.status(401).json({ message: "Authentication failed.", data: null });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not Authenticated", data: null });
    // const error = new Error('Not authenticated.');
    // error.statusCode = 401;
    // throw error;
  }
  //  Bearer token
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error", data: null });
    // err.statusCode = 500;
    // throw err;
  }
  if (!decodedToken) {
    return res.status(401).json({ message: "Not Authenticated", data: null });
    // const error = new Error('Not authenticated.');
    // error.statusCode = 401;
    // throw error;
  }
  req.userId = decodedToken.userId;
  next();
};

exports.sendApiJson = (req, res, next) => {
  if (!res.locals.data) {
    return res.status(500).json({
      message: "Error: No data found.",
      data: null,
    });
  }
  console.log("about to send json!");
  res.json({
    message: "Success",
    data: res.locals.data,
  });
};
