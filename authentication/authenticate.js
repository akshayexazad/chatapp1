const jwt = require('jsonwebtoken');
const User = require('../model/usermodel');

const  authenticate  = async (req,res,next)=>{
    try {
        const token = req.header('Authorization');
        // console.log(token)

        const user = jwt.verify(token,'secretKey');
        // console.log(user ,'akshay /..........................................')
        await User.findByPk(user.userId).then(user=>{

          req.user = user;

        next()
        })

    
        
    } catch (error) {
        console.log(error)
    }

}
module.exports={
    authenticate
}