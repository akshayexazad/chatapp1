const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express();
const database = require('./config/database');
const User = require('./model/usermodel')
const chatModel = require('./model/userchatmodel');
const Group = require('./model/groupmodel');
const member = require('./model/membermodel');

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}));



app.use('/user',require('./route/userroute'))
app.use('/chat',require('./route/chatroute'))
app.use('/groupChat',require('./route/groupChatroute'))

User.belongsToMany(Group, { through: member });
Group.belongsToMany(User, { through: member });

User.belongsToMany(Group, { through: chatModel });
Group.belongsToMany(User, { through: chatModel });
 
// member.hasMany(chatModel);
// chatModel.belongsTo(member);

  

database.sync().then(()=>{


     console.log('done')
   }).catch((err)=>{
      console.log(err) 
   })




app.listen(3001,(req,res)=>{
    console.log('app running on 3001')
});
