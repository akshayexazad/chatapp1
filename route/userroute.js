const express  =require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

router.post('/login',userController.login)

router.post('/sign-up',userController.signup)




module.exports = router;
