var token = localStorage.getItem('token');
// var groupid = localStorage.getItem('groupid');

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }






async function sendGroupMessage(event){
    try {
        event.preventDefault();
        const user_message = event.target.message.value;
        
        const messageresponse = await axios.post('http://localhost:3001/groupChat/sendGroupChat',{user_message},{ headers: { "Authorization": token }});
        document.getElementById("chat-message").value = "";
        const chatmessage= document.getElementById("for-chat-message");
        const createlm = document.createElement('div');
        const text = document.createTextNode(messageresponse.data.saveUserChat.message);
        chatmessage.appendChild(createlm).appendChild(text);
    
        } catch (error) {
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
            console.log(error) 
        }
};

window.addEventListener("DOMContentLoaded",async ()=>{
    try {
  
    const totalGroup = await axios.get(`http://localhost:3001/groupChat/getGroups`,{ headers: { "Authorization": token }});
    
    printGroup(totalGroup.data.getGroups)
    

    } catch (error) {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
        console.log(error)
    }
    
});

function printGroup(groups){
for(let i =0;i<groups.length;i++){
   const parentNode = document.getElementById("for-availabe-group");
   const childHTML = `<div >${groups[i].groupname} <button onclick = "addMember(event)" id ='${groups[i].id}'> AddMember </button> <button onclick = "viewChat(event)" id ='${groups[i].id}'> View Chat </button> <button onclick = "viewGroupMember(event)" id ='${groups[i].id}'> View Member </button></div>`
   parentNode.innerHTML = parentNode.innerHTML + childHTML;
} 
}

function addMember(event){
    localStorage.setItem("groupid",`${event.target.id}`)

window.location.href = '../HTML/member.html'
    
    
}

async function viewChat(event){
    localStorage.setItem("groupid",`${event.target.id}`)
   const  groupid1 = localStorage.getItem("groupid")
    const messageresponse = await axios.post('http://localhost:3001/groupChat/getGroupChat',{groupid1},{ headers: { "Authorization": token }});
    console.log(messageresponse.data.allChat)
    printchat(messageresponse.data.allChat,messageresponse.data.myid)
   
    
};

function printchat(data,id){
    alert('hello')
    for(let i =0;i<data.length;i++){
        const parentNode = document.getElementById("for-chat-message");
       
        const childHTML = `<div id = "${id}">${data[i].message} </div>`
        parentNode.innerHTML = parentNode.innerHTML + childHTML;
        }
}

async function sendGroupMessage(event){
   const  groupid = localStorage.getItem("groupid")
    try {
    event.preventDefault();
    const user_message = event.target.message.value;
    
    const messageresponse = await axios.post('http://localhost:3001/groupChat/sendGroupChat',{user_message,groupid},{ headers: { "Authorization": token }});
    document.getElementById("chat-message").value = "";
    const chatmessage= document.getElementById("for-chat-message");
    const createlm = document.createElement('div');
    const text = document.createTextNode(messageresponse.data.saveUserChat.message);
    chatmessage.appendChild(createlm).appendChild(text);

    } catch (error) {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
        console.log(error) 
    }
};
// for view group member and admin power
async function viewGroupMember(event){
    localStorage.setItem("grpid",`${event.target.id}`);
    
    window.location.href = '../HTML/adminFeatures.html'



}









