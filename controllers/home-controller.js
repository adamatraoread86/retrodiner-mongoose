const Contact = require("../models/mongoose/contact-model");

exports.getHome = (req, res) => {
  console.log("User is: ", req.session.user);

  // Retrieve user first name if a user exists in the session.  Otherwise, set it to null.
  const firstName = req.session.user ? req.session.user.firstName : null

  res.render("index", {
    pageTitle: "Home",
    firstName: firstName,
  });
};

exports.getAbout = (req, res) => {
  res.render("about", { pageTitle: "About Us" });
};

exports.getContact = (req, res) => {
  res.render("contact", { pageTitle: "Contact" });
};

exports.postContact = (req, res, next) => {
  // Retrieve the data from the form
  const { name, email, subject, message } = req.body;

  // Log the request body to the console
  console.log("Body is: ", req.body);

  // Create a new contact record in the database
  Contact.create({
    name: name,
    email: email,
    subject: subject,
    message: message,
  })
    .then((response) => {
      console.log("Success!", response);
      res.render("contact", {
        pageTitle: "Contact",
        message: "Thank you!  Your request was received.",
      });
    })
    .catch((err) => {
      console.log("Error is: ", err);
      res.render("contact", {
        pageTitle: "Contact",
        message:
          "Oops, something went wrong.  Please correct any errors below and try again.",
        entries: req.body,
        errors: Object.values(err.errors),
      });
    });
};
