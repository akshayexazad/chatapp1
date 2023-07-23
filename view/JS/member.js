
let member = {};
let arr = []
var token = localStorage.getItem('token');
var groupid = localStorage.getItem('groupid');
var memberSave = document.getElementById("memberSave");

// refresh page
window.addEventListener("DOMContentLoaded",async ()=>{
    try {
  
    const totalGroup = await axios.get(`http://localhost:3001/groupChat/addmember`,{ headers: { "Authorization": token }});
    
    printmember(totalGroup.data.alluser)
    

    } catch (error) {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
        console.log(error)
    }
    
});
 
// print member
async function printmember(Info){
    
    for(let i =0;i<Info.length;i++){
    const parentNode = document.getElementById("for-available-user");
    const childHTML = `<div id = "hide"><p>${Info[i].name}</P><button onclick = "addone(event)" id ="${Info[i].email}" value ="${Info[i].id}">Add</button>  <button onclick = "makeAdmine(event)" id ="${Info[i].email}" value ="${Info[i].id}">make admin</button></div>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;


    
    }
}  
 
// store selected member

async function addone(event){


    event.preventDefault();
    // console.log(event.target.button.value)
 const button  = document.getElementById("hide").innerHTML = "hello"
 console.log(button)
    
    member[`${event.target.value}`] ={email:event.target.id,id:event.target.value,isAdmin:false}


    
//    x.event.target.id = "akshay"
    console.log(member)
}

//save meber on data base

memberSave.addEventListener('click',async()=>{
try {
    const saveMember = await axios.post(`http://localhost:3001/groupChat/saveMember`,{member,groupid},{ headers: { "Authorization": token }}); 
    window.location.href = '../HTML/groupChat.html';
    console.log(saveMember)
} catch (error) {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
    console.log(error)
}  
});


function makeAdmine(event){
    event.preventDefault();

    member[`${event.target.value}`].isAdmin = true;
    console.log(member);

};