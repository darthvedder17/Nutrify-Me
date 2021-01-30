const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const MealSchema = new Schema({
  username:{
    type:String,
    required:true

  },
  datetime: {
    type: Date,
    required: true,

  },
  meal: {
    type:String,
    required: true
  },
  calorie:{
    type:Number,
    required:true

  },
  description:{
    type:String,
    required:true
  }
});
module.exports = Meal = mongoose.model("meals", MealSchema);