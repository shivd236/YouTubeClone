const express = require('express');
const router = express.Router();
const commentControllers = require('../Controllers/comment');
const auth = require('../Middleware/authentication');

router.post('/comment',auth,commentControllers.addComment);

router.get('/comment/:videoId',commentControllers.getCommentByVideoId);







module.exports = router;