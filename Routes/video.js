const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/video');
const auth = require('../Middleware/authentication');


router.post('/video',auth,videoController.uploadVideo);

router.get('/allVideo',videoController.getAllVideo);

router.get('/getVideoById/:id', videoController.getVideoById);

router.get('/:userId/channel',videoController.getAllVideoByUserId);

// Like video route
router.post('/video/:id/like', auth, videoController.likeVideo);

// Dislike video route
router.post('/video/:id/dislike', auth, videoController.dislikeVideo);





module.exports = router;