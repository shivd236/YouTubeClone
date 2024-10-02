const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    required : true
  },
  title : {
    type : String,
    required : [true , "Title is Required!"],
  },
  description : {
    type : String,
  },
  videoLink : {
    type : String,
    required : [true , "Video is Requred! And Video Size Limit max 100 Mb."],
  },
  thumbnail : {
    type : String,
    required : [true , "Thumbnail is Required!"],
  },
  videoType : {
    type : String,
    default : "All"
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]

}, {timestamps : true});

module.exports = mongoose.model('video', videoSchema);