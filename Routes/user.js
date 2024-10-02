const express = require('express');
const router = express.Router();
const userControllers = require('../Controllers/user');


router.post("/signUp",userControllers.signUp);

router.post("/signIn",userControllers.signIn);

router.post('/logout',userControllers.logout);




module.exports = router;