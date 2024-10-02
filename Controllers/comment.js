const Comment = require('../Modals/comment');


//---> Add comment in video api;

exports.addComment = async (req, res) => {
  try {
    const { video, message } = req.body;

    // Create a new comment
    let comment = new Comment({ user: req.user._id, video, message });

    // Save the comment to the database
    await comment.save();

    // Populate the user details before sending the response
    comment = await comment.populate('user', 'channelName profilePic userName createdAt');


    return res.status(201).json({
      message: "User Successfully Comment",
      comment: comment,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//------------> get comment by video id;

exports.getCommentByVideoId = async (req, res) => {
  try {
    const {videoId} = req.params;
    const comments = await Comment.find({video : videoId}).populate('user','channelName profilePic userName createdAt');     

    return res.status(201).json({
      message : "Success",
      comments : comments,
    });
    
    
  } catch (error) {
    return res.status(500).json({message : error.message});
    
  }
}