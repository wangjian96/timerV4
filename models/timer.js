/*
Wang Jian
Assignment11
2017 01 17
CSE270E
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create a schema
var timerSchema = new Schema({
  username : String,
  timerName : String,
  timerNum : Number,
  doneTime: {type: Number, default: -1},
  state: {type: Number, default:0},
});
//exports it so that all files can access
module.exports = mongoose.model('timer', timerSchema);
