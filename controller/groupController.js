const expess =require('express');
const UserChat = require('../model/userchatmodel');
const User = require('../model/usermodel');
const Group = require('../model/groupmodel');
const Member = require('../model/membermodel');
const { where } = require('sequelize');

const sendGroupChat=async (req,res)=>{
    try {
        const {user_message,groupid} = req.body; 
        const saveUserChat = await  UserChat.create({message:user_message,groupId:groupid,userId:req.user.id});
        res.status(201).json({saveUserChat:saveUserChat})
      } catch (error) {
          console.log(error)
      }
      
}

const getGroupChat = async(req,res)=>{
    const myid = req.user.id;
    const groupid = req.body.groupid1;
    
    try {
       const getChat =  await UserChat.findAll({where:{groupId:groupid}});
       
        res.status(201).json({allChat:getChat,myid:myid})
      
    } catch (error) {
        console.log(error)
    }

}

const creategroup = async (req,res)=>{
    const id = req.user.id;
    const groupName = req.body.groupname;

    try {
        const createdGroup = await Group.create({groupname:groupName,userId:id});
        res.status(201).json({group:createdGroup})

        
    } catch (error) {
        console.log(error)
        
    }

}
const getGroups = async (req,res)=>{
    try {
        const totalGroup = await Group.findAll();
        res.status(201).json({getGroups:totalGroup})
    } catch (error) {
        console.log(error)
    }
   
}

const addmember = async (req,res) =>{
    try {
        const getalluser = await User.findAll()
        res.status(201).json({alluser:getalluser})
    } catch (error) {
        console.log(error)
        
    }
}

const saveMember =async (req,res)=>{
const groupid = req.body.groupid;


const member  = req.body.member;
try{

for(let item in member){

 var update = await Member.create({memberemail:member[item].email,userId:member[item].id ,groupId:groupid,isAdmin:member[item].isAdmin})
    
}
res.send({msg:"okkk",status:true})
}catch(error){
   console.log(error)
}

};

const viewGroupMember = async(req,res)=>{


    const id = req.body.grpid;

    try{
        const memberDetails =  await Member.findAll({where:{groupId:id}});
        res.status(201).json({memberDetails:memberDetails})

    }catch(error){
       console.log(error)
    }
   
    


}
const deleteMember = async (req,res)=>{
    const grpid = req.body.grpid;
    const member_id = req.query.id ;
    const findGrp =await  Member.destroy({where:{groupId:grpid,userId:member_id}});
    res.status(201).json({msg:"deleted successfully.."})

    console.log(findGrp)
   
    

}

module.exports = {
    sendGroupChat,getGroupChat,creategroup,getGroups,addmember,saveMember,viewGroupMember,deleteMember
}