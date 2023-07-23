const Sequalize = require('sequelize');
const db =require('../config/database');

const Member = db.define('member_juction2',{
    id:{
        type:Sequalize.DataTypes.INTEGER,
        autoIncrement:true,
        
        primaryKey:true
    },
    
    memberemail:{
        type:Sequalize.DataTypes.STRING
    },
    isAdmin:Sequalize.DataTypes.BOOLEAN

});
module.exports = Member;
