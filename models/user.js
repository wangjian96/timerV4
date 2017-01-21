/*
Wang Jian
Assignment11
2017 01 17
CSE270E
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create a schema
var userSchema = new Schema({
  username : String,
  password : String,
  email : String,
  lastAccess: {type: Date,default: Date.now},
  visits: {type: Number, default:0},
});
//exports it so that all files can access
module.exports = mongoose.model('account', userSchema);
