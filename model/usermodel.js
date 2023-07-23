 const Sequalize = require('sequelize');
const db =require('../config/database');

const User = db.define('user',{
    id:{
        type:Sequalize.DataTypes.INTEGER,
        autoIncrement:true,
        
        primaryKey:true
    },
    name:{
        type:Sequalize.DataTypes.STRING
    },
    email:{
        type:Sequalize.DataTypes.STRING,
        unique:true
    },
    phonenumber:{
        type:Sequalize.DataTypes.STRING
    },
    password:{
        type:Sequalize.DataTypes.STRING
    },
    islogin:Sequalize.DataTypes.BOOLEAN

});
module.exports = User;
