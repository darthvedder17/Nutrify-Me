var express = require('express');
var router = express.Router();

/* GET home page. */

const User = require("../models/Users");
var getToday = (req,res)=>{
	const id = req.session.userId;
	const {mealDate} = req.body;
	console.log(mealDate)
	console.log(req.session.mealDate);
		User.findOne({_id:id}).then(user=>{
		let meals = user.meals;
		req.session.meals = meals;
		req.session.mealDate = mealDate;
		res.redirect('/dashboard');
	});
};


router.post('/getToday', getToday);

router.get('/dashboard',
    (req, res, next)=>{
		console.log('This is user id : ', req.session.userId)
        if(req.session.userId){
            return next();
        }
        res.redirect('/');
    },(req,res)=>{
		console.log('FINAL MEALS FOR FRONTEND: ',req.session.calorie)
	
		res.render('dashboard',{
			

			meals : req.session.meals, mealDate : req.session.mealDate, totalCalorie : 1500

		
	});
    });







module.exports = router;


