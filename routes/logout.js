

  var express = require('express');
  var router = express.Router();
  /* GET home page. */



  router.get('/logout', function(req, res, next) {

  		req.session.destroy(function (err) {
  		   		res.redirect('/'); 
  		  
  		  });




  	
  });

  module.exports = router;


