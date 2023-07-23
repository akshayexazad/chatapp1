
const expess =require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../model/usermodel')

// for generating token

function generateToken(id,name,email){
    return jwt.sign({userId:id,name:name,email:email},'secretKey')
 }
 

 // for login

const login = async (req,res)=>{
    try {
        const {email,password}= req.body;
        if (isstringValid(email)|| isstringValid(password)){
            res.status(400).json({msg: 'something is missing'})
          }

        const  findmatch = await User.findOne({ where: {email:email}}) 
        console.log(findmatch,'1111111111111111111111111111111111111111111111111111111111111111')
    
        if(findmatch===null){
          res.status(401).json({message:findmatch})
           
        }else{
             bcrypt.compare(password,findmatch.password,async(err,result)=>{

                if(err){
                    res.status(401).json({message:err})

                }

                else if(result===true){
                    // const token=jwt.sign({userId:findmatch.id,name:findmatch.name},'secretKey')
                    await findmatch.update({islogin:true})
                    
                    res.status(201).json({message:'Login successfully..',token:generateToken(findmatch.id,findmatch.name,findmatch.email)}) 
                }
                else{
                    res.status(401).json({message:'user not authorised'})
                }
             })
               
    
        }
    } catch (error) {
       return res.status(500).json({message:error.message})
    }
}

//for checking empty string

function isstringValid(string){
    if(string == undefined || string.length ===0 ){
     return true
    }else{
      return false
   }
};


//for signup 

const signup = async(req,res)=>{
    try {
        const {name,email,phone_no,password} = req.body;
    
    if(isstringValid(name)|| isstringValid(email)|| isstringValid(password)){
        res.status(400).json({msg: 'something is missing'})
      }

        
        const findmatch = await User.findOne({ where: {email:email}}) 
        if(findmatch===null){
            const salt =10;
            bcrypt.hash(password,salt,async(err,hash)=>{
                // console.log(hash)
                const user = await User.create({name:name,email:email,phonenumber:phone_no,password:hash});
               res.status(201).json({newuser:user})
            })
           
        }else {
            return res.status(401).json({newuser:"User alredy exist"})
        }
    } catch (error) {
        console.log(error)
       return res.status(500).json({message:error.message})
    }
}




module.exports ={
    login,signup
}