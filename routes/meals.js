var express = require('express');
var router = express.Router();
/* GET home page. */
const User  = require('../models/Users');
const Meal = require("../models/Meals");

router.get('/meals', function(req, res, next) {
  // console.log('Username cookie:  --- ---')
  // console.log(global.usernameCookie);
  // console.log('Calorie Limit cookie : ------ ');
  // console.log(global.calorieCookie);
  console.log(req.session);
  res.render('meals', { title: 'Home Route' });

});

// console.log(username)

router.post('/meals/user',(req,res,next)=>{

			const id = req.session.userId;
			User.findOne({ _id: id}).then(user => {
							if ( !user ) {
			
									return res.status(400).json({ user: 'Username not present in session'} );
							
										} 
							else {
				
									let meals = user.meals;
									meals.push({mealDate: req.body.datetime,mealName:req.body.meal,mealCalories:req.body.calorie,mealDescription:req.body.description})
									User.updateOne({_id:id},{meals: meals},(err,msg)=>{}); 

									req.session.meals = meals;

									console.log(req.session.meals);
									res.redirect('/dashboard');	

				}
			});
				// console.log(calories_per_day.body);


	});


	
router.post('/meals/delete',
	(req,res)=>{
		const id= req.session.userId;
		User.findOne({_id:id}).then(()=>{
			User.updateOne({_id:id},{meals: req.body},(err)=>{
				if(err){
					console.log(err);
				}
			});
			req.session.meals = req.body;
			if(req.session.admin==true){
				res.redirect('/adminDashboard')
			}
			else{
				res.redirect('/dashboard');
			}
		});
	});

router.post('/meals/edit', (req,res)=>{
    const id= req.session.userId;
    User.findOne({_id:id}).then(()=>{
        User.updateOne({_id:id},{meals: req.body},(err)=>{
            if(err){
                console.log(err);
            }
        });
        req.session.meals = req.body;
        if(req.session.admin==true){
            res.redirect('/adminDashboard')
        }
        else{
            res.redirect('/dashboard');
        }
    });
});
















module.exports = router;


