const Sequalize = require('sequelize');
const db =require('../config/database');

const Group = db.define('group',{
    id:{
        type:Sequalize.DataTypes.INTEGER,
        autoIncrement:true,
        
        primaryKey:true
    },
    groupname:{
        type:Sequalize.DataTypes.STRING
    }
  

});
module.exports = Group;
