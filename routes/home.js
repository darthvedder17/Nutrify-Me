var express = require('express');
var router = express.Router();
var check = require('./login')
/* GET home page. */



router.get('/home',check.isAuthenticated, function(req, res, next) {


		res.render('home', { title: 'Home Route' });


	
});

module.exports = router;


