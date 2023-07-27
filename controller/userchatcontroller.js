const expess = require('express');
const UserChat = require('../model/userchatmodel');
const User = require('../model/usermodel')


const userInfo = async (req, res) => {
    try {
        const id = req.user.id;
    
        const getDetails = await User.findByPk(id);
        const activeUser = await User.findAll({ where: { islogin: true } });
        const getuserForgrouup = await User.findAll();

        if (getDetails === null) {
            res.status(401).json({ userdata: "User not found" })
        } else {
            res.status(201).json({ userName: getDetails.name, allChat: getuserForgrouup, activeUser: activeUser })
        
        }

    } catch (error) {

        console.log(error)
    }


}
const logout = async (req, res) => {
    try {
        if (req.user.islogin) {
            await req.user.update({ islogin: false });
            res.status(201).json({ logout: true })
        }
    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    userInfo, logout
}