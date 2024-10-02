const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
 
 channelName : {
  type : String,
  required : [true , "ChannelName is Required!"],
 },

 userName : {
  type : String,
  required : [true, "UserName Is Required!"],
 },

 password : {
  type : String,
  required : [true, "Password is required!"],
 },

 about : {
  type : String,
  required : [true , "About is required!"],
 },
  
  profilePic : {
  type : String,
  required : [true , "profilePic is Required!"],
 },

},{timestamps : true});

module.exports = mongoose.model('user', userSchema);

