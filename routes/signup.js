// var express   = require('express');
// var router    = express.Router();
// // var mongoose  = require('mongoose');
// var User      = require("../models/Users");

// var crypto    = require('crypto'), hmac, signature;
// const { check, validationResult } = require('express-validator');
// const { matchedData, sanitize }   = require('express-validator/filter');

//   //  /* GET home page. */
//   // router.get('/', function(req, res, next) {
//   //     res.render('index', { title: 'Nodejs user registration'});
//   //  })
// router.get('/signup', function(req, res, next) {
//   res.render('signup', { title: 'Sign Up' });
// });
   
//   /* POST user registration page. */
//   router.post('/signup/user',[ 
   
//     check('fname','Name cannot be left blank')
//     .isLength({ min: 1 }),
   
//     check('email')
//     .isEmail().withMessage('Please enter a valid email address')
//     .trim()
//     .normalizeEmail()
//     .custom(value => {
//         return findUserByEmail(value).then(User => {
//           //if user email already exists throw an error
//       })
//     }),

//     check('password')
//     .isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
//     .matches(/\d/).withMessage('Password must contain one number')
//     .custom((value,{req, loc, path}) => {
//       if (value !== req.body.password2) {
//           // throw error if passwords do not match
//           throw new Error("Passwords don't match");
//       } else {
//           return value;
//       }
//   }),

    

//    ], function(req, res, next) {

//       const errors = validationResult(req);

//     if (!errors.isEmpty()) {     
        
//        res.json({status : "error", message : errors.array()});

//     } else {

//         hmac = crypto.createHmac("sha1", 'auth secret');
//         var encpassword = '';

//         if(req.body.password){
//           hmac.update(req.body.password);
//           encpassword = hmac.digest("hex");
//         }
//         var document = {
//                 fname: req.body.fname,
//                 lname: req.body.lname,
//                 password: req.body.password,
//                 calories_per_day: req.body.calories_per_day,
//                 phone:req.body.phone,
//                 email:req.body.email,
//                 username:req.body.username,
//           };
        
//         var user = new User(document); 
//         user.save(function(error){
//           console.log(user);
//           if(error){ 
//             throw error;
//           }
//           res.json({message : "Data saved successfully.", status : "success"});
//           res.redirect('/login')
//        });    
//     }
// });

// function findUserByEmail(email){

//   if(email){
//       return new Promise((resolve, reject) => {
//         User.findOne({ email: email })
//           .exec((err, doc) => {
//             if (err) return reject(err)
//             if (doc) return reject(new Error('This email already exists. Please enter another email.'))
//             else return resolve(email)
//           })
//       })
//     }
//  }


// module.exports = router;







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