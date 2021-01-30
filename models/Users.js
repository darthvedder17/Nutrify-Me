const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname:{
    type:String,
    required:true
  },
  password: {
    type:String,
    required: true
  },
  calories_per_day:{
  type:Number,
    required:true

  },
  phone:{
    type:String,
    required:true
  },
  email:{
type:String,
required:true

  },
  username: {
    type: String,
    required: true
  },
  meals : { 
    type : Array,
    default : []
}
});


var getUser = (req,res)=>{
  const {id} = req.params;
  
  userModel.findOne({_id:id}).then(user=>{
      if(user){
          req.session.userId = id;
          req.session.meals = user.meals;
          req.session.username = user.username;
          req.session.calorie = user.calorie;
          var today = new Date();
          req.session.mealDate = today.toISOString().substr(0, 10);
          res.redirect('/dashboard');
      }
      else{
          req.session.message="Register First";
          res.redirect('/signup');
      }
  })
};






module.exports = User = mongoose.model("users", UserSchema);
module.exports.getUser = getUser;