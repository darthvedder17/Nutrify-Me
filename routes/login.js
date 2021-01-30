
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/Users");
/* GET home page. */


function isAuthenticated(req,res,next){
      if (req.session.username){

          return next();

          }
      else{

          res.redirect('/');
          }


      } 

router.get('/', function(req, res, next) {

      res.render('login', { title: 'Login Route' });


});


router.post("/login/user", (req, res,next) => {
  
  req.session.username = req.body.username
  global.sess = req.session.username;


const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const username = req.body.username;
const password = req.body.password;
const {id} = req.params
console.log('These are req params :', req.session.userId);
// Find user by username
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "Username not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        req.session.userId  = user._id
        req.session.meals = user.meals;
        req.session.username = user.username;
        req.session.calorie = user.calorie;
        var today = new Date();
        req.session.mealDate = today.toISOString().substr(0, 10);
        const payload = {
          id: user.id,
          username: user.username
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


module.exports = {
router:router,
isAuthenticated: isAuthenticated


};


