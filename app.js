var createError = require('http-errors');
express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
var home  = require('./routes/home');
var meals = require('./routes/meals');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var logout = require('./routes/logout');
var signup = require('./routes/signup');
// Require passport and manage users
const passport = require("passport");
const db = require("./config/keys").mongoURI;
 
app = express();
let session = require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', dashboard);
// app.use('/login', login);

// Connect to DB


mongoose
  .connect(
    db,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport");



// Routes
app.use(session({
secret: 'mapdcs',
resave: true,
saveUninitialized: true,    
cookie: {
    
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
}
}));



app.use('/',login.router);
app.use("/", home);
app.use('/',signup);
app.use('/',meals);
app.use('/',dashboard);
app.use('/',logout);

// app.use('/signup',signup);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;





