const Sequalize = require('sequelize');

const sequelize = new Sequalize('try','root','Akshay@123',{
    host:'localhost',
    dialect:'mysql'
});
try {
 sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };

  module.exports = sequelize;