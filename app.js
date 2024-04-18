// Import the path package to construct file paths
const path = require('path');
require("dotenv").config();
// Import npm libraries
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Import controllers
const homeController = require('./controllers/home-controller');
const menuController = require('./controllers/menu-controller');
const errorController = require('./controllers/error-controller');

// Import routers
const menuRouter = require('./routes/menu-routes');
const homeRouter = require('./routes/home-routes');
const authRouter = require('./routes/auth-routes');
const apiRouter = require("./routes/api-routes");
const blogRouter = require("./routes/blog-routes");

// Database connection string
const MONGODB_URI =  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qb2hoxm.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;


// Initialize session store
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

// Initialize our app
const app = express();



// Initialize app settings
app.set('view engine', 'ejs');
app.set('views', 'views');

// Mount middleware

// Point the application to the location of static resources
app.use(express.static(path.join(__dirname, 'public')));

// Mount middleware to parse request bodies from web forms
app.use(express.urlencoded({extended: false}));

// Mount middleware to parse json request bodies
app.use(express.json());

// Tell the application to use express-ejs-layouts
app.use(expressLayouts);

// Register session middleware
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
//Store in res.locals
  app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.user = req.session.user;
    next();
  })

// Register routes

// Mount middleware for menu routes
app.use("/menu", menuRouter);

// Mount middleware for blog routes
app.use("/blog", blogRouter);

//Mount middleware for auth routes
app.use("/auth", authRouter);

// Mount middleware for api routes
app.use("/api", apiRouter);

// Mount middleware for home routes
app.use(homeRouter);


// Middleware to handle unrecognized requests
app.use(errorController.get404);

// Middleware to handle server-side errors
app.use(errorController.get500);


// First connect to database server, then launch app.
mongoose
.connect(MONGODB_URI)
.then((result) => {
 app.listen(process.env.PORT || 3000)
})
.catch((err) => {
  console.log(err);
});




