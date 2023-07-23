const express  =require('express');
const router = express.Router();
const chatController = require('../controller/userchatcontroller');
const groupchatController = require('../controller/groupController');


const auth = require('../authentication/authenticate');

// router.post('/sendUserChat',auth.authenticate,chatController.sendUserChat);
router.get('/userInfo',auth.authenticate,chatController.userInfo);
router.get('/logout',auth.authenticate,chatController.logout);



module.exports = router;
