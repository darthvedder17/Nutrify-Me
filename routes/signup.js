


var express = require('express');
var router = express.Router();


const bcrypt = require("bcryptjs");
// Load input validation
const validateRegisterInput = require("../validation/register");
// Load User model
const User = require("../models/Users");

/* GET home page. */
  router.get('/signup', function(req, res, next) {
      res.render('signup', { title: 'Nodejs user registration'});
   })



router.post("/signup/api/user", (req, res) => {



const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    
    return res.status(400).json(errors);
    
  }
User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        password: req.body.password,
        calories_per_day: req.body.calories_per_day,
        phone:req.body.phone,
        email:req.body.email,
        username:req.body.username
        
      
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;