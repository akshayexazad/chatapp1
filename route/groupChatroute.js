const express  =require('express');
const router = express.Router();
const auth = require('../authentication/authenticate');
const groupchatController = require('../controller/groupController');
router.post('/sendGroupChat',auth.authenticate,groupchatController.sendGroupChat);
router.post('/getGroupChat',auth.authenticate,groupchatController.getGroupChat);
router.post('/CreateGroup',auth.authenticate,groupchatController.creategroup);
router.get('/getGroups',auth.authenticate,groupchatController.getGroups);
router.get('/addmember',auth.authenticate,groupchatController.addmember);
router.post('/saveMember',auth.authenticate,groupchatController.saveMember);
router.post('/viewGroupMember',auth.authenticate,groupchatController.viewGroupMember);








module.exports = router;