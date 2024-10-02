const Video = require('../Modals/video');



//-----> video upload api;
exports.uploadVideo = async (req, res) =>{
   try {
    const {title, description, videoLink, videoType, thumbnail } = req.body;
    const videoUpload = new Video({user: req.user._id, title, description, videoLink, videoType, thumbnail });

   await videoUpload.save();

   return res.status(201).json({message : "Video Uploaded Successfully", result : videoUpload});
    
    
   } catch (error) {
    return res.status(500).json({message : error.message});
    
   }
}


//---------> get all video api;

exports.getAllVideo = async (req, res) => {
   try {

      const videos = await Video.find().populate('user','channelName profilePic userName createdAt');

      return res.status(201).json({message : "All Video Fechted Successfully", result : videos});
      
   } catch (error) {

          return res.status(500).json({message : error.message});
   }
};



//--------------------->get video by id ka api;

exports.getVideoById = async (req, res) =>{
   try {
      const {id} = req.params;
      const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt');

      return res.status(201).json({message : "get video by id", result : video});
   } catch (error) {
      return res.status(500).json({message : error.message});
      
   }
};

// get all video by user id ;

exports.getAllVideoByUserId = async (req, res) =>{
   try {
      const {userId} = req.params;
      const video = await Video.find({user : userId}).populate('user','channelName profilePic userName createdAt about');
      return res.status(201).json({message : "get all video by userId", result : video});


      
   } catch (error) {
      return res.status(500).json({message : error.message});
      
   }
};

//-----------------------------------------------------------------------------------------//

// Like a video
exports.likeVideo = async (req, res) => {
   try {
     const { id } = req.params; // Video ID from request params
     const userId = req.user._id; // User ID from auth middleware
 
     const video = await Video.findById(id);
 
     if (!video) {
       return res.status(404).json({ message: "Video not found!" });
     }
 
     // Check if user has already liked the video
     if (video.likes.includes(userId)) {
       // If user already liked, remove the like (toggle off)
       video.likes = video.likes.filter(like => like.toString() !== userId.toString());
     } else {
       // Remove user from dislikes if they previously disliked
       if (video.dislikes.includes(userId)) {
         video.dislikes = video.dislikes.filter(dislike => dislike.toString() !== userId.toString());
       }
 
       // Add user to likes
       video.likes.push(userId);
     }
 
     await video.save();
 
     res.status(200).json({
       message: video.likes.includes(userId) ? "Video liked successfully!" : "Like removed successfully!",
       likes: video.likes.length,
       dislikes: video.dislikes.length
     });
 
   } catch (error) {
     return res.status(500).json({ message: error.message });
   }
 };
 
 // Dislike a video
 exports.dislikeVideo = async (req, res) => {
   try {
     const { id } = req.params; // Video ID from request params
     const userId = req.user._id; // User ID from auth middleware
 
     const video = await Video.findById(id);
 
     if (!video) {
       return res.status(404).json({ message: "Video not found!" });
     }
 
     // Check if user has already disliked the video
     if (video.dislikes.includes(userId)) {
       // If user already disliked, remove the dislike (toggle off)
       video.dislikes = video.dislikes.filter(dislike => dislike.toString() !== userId.toString());
     } else {
       // Remove user from likes if they previously liked
       if (video.likes.includes(userId)) {
         video.likes = video.likes.filter(like => like.toString() !== userId.toString());
       }
 
       // Add user to dislikes
       video.dislikes.push(userId);
     }
 
     await video.save();
 
     res.status(200).json({
       message: video.dislikes.includes(userId) ? "Video disliked successfully!" : "Dislike removed successfully!",
       likes: video.likes.length,
       dislikes: video.dislikes.length
     });
 
   } catch (error) {
     return res.status(500).json({ message: error.message });
   }
 };
 