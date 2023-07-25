const Sequelize= require("sequelize");
const db = require("../config/database");
const chat = db.define("Chat", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
message:{
    type:Sequelize.STRING,    
},
groupsid:{
  type:Sequelize.STRING,    
},
usersid:{
  type:Sequelize.STRING,
}


})
module.exports=chat;