const User = require("../models/mongoose/user-model");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login" });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { pageTitle: "Signup" });
};

exports.authUser = async (req, res, next) => {
  // Retrieve values from form
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Find matching user by email
    const user = await User.findOne({ email: email });
    let passwordsMatch = false;
    if (user) {
      passwordsMatch = await user.validatePassword(password);
    }
    res.locals.user = user;
    res.locals.passwordsMatch = passwordsMatch;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.loginWebApp = async (req, res, next) => {
  const { user, passwordsMatch } = res.locals;
  // console.log("user and password are", user, passwordsMatch);

  if (user && passwordsMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      console.log(err);
      res.redirect("/");
    });
  }
  return res.render("auth/login", {
    pageTitle: "Login",
    message: "Invalid Credentials",
    entries: req.body,
  });
};

exports.postLogin = async (req, res, next) => {
  // Retrieve values from form
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Find matching user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.render("auth/login", {
        pageTitle: "Login",
        message: "Invalid Credentials",
        entries: req.body,
      });
    }

    const passwordsMatch = await user.validatePassword(password);

    if (!passwordsMatch) {
      return res.render("auth/login", {
        pageTitle: "Login",
        message: "Invalid Credentials",
        entries: req.body,
      });
    }

    if (user && passwordsMatch) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    }
  } catch (err) {
    console.log(err);
    return res.render("auth/login", {
      pageTitle: "Login",
      message: "Oops, something went wrong.  Please try again.",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
};

exports.postSignup = async (req, res, next) => {
  // Retrieve data from the form
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Use static method of model to check if the email is unique
    const emailUnique = await User.checkEmailUnique(email);

    if (!emailUnique) {
      return res.render("auth/signup", {
        pageTitle: "Signup",
        message:
          "Sorry, that email address is taken.  Please choose a different one.",
        entries: req.body,
      });
    }

    // Create the new user
    // Could also use User.create instead

    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    res.render("auth/signup", {
      pageTitle: "Signup",
      message: "Oops!  Please correct the following errors and try again:",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
