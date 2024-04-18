exports.get404 = (req, res, next) => {
    res.render("error/404", {pageTitle: "Not Found"});
}

exports.get500 = (err, req, res, next) => {
    console.log(err);
    // Log error to a file or do something else with it
    res.render("error/500", {pageTitle: "Server Error"});
}