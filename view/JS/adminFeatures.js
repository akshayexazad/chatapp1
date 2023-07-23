
var token = localStorage.getItem('token');
window.addEventListener("DOMContentLoaded",async ()=>{
    const grpid = localStorage.getItem("grpid")
    const viewGroupMember = await axios.post('http://localhost:3001/groupChat/viewGroupMember',{grpid},{ headers: { "Authorization": token }});
    // console.log(viewGroupMember.data.memberDetails);
    printGroup(viewGroupMember.data.memberDetails)

    
});

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

function printGroup(groups){
    const userdata = parseJwt(token)
    // console.log(userdata.userId)
    for(let i =0;i<groups.length;i++){
    //   console.log(`hii ${userdata.userId}-----${groups[i].userId}`)

      if(userdata.userId === groups[i].userId){
        console.log(groups)
        if(groups[i].isAdmin){
           printAdmin(groups);
           break;
        }else{
            normalUser(groups);
            break;
        }
      }
    } 
 }
 function printAdmin(groups){
    for(let i =0;i<groups.length;i++){
    const parentNode = document.getElementById("for-availabe-group");
    
    const childHTML = `<div class = "groups[i].memberemail" >${groups[i].memberemail}<button onclick = "Remove_member(event)" id ='${groups[i].userId}'> Remove </button></div>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
    }
 };

function normalUser(groups){
    for(let i =0;i<groups.length;i++){
    const parentNode = document.getElementById("for-availabe-group");
    
    const childHTML = `<div >${groups[i].memberemail}</div>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
    }
 };
  
 async function Remove_member(event){
    event.preventDefault();
    const grpid = localStorage.getItem("grpid")
    const id = event.target.id;
   
    try {
     const Delete_member = await axios.post(`http://localhost:3001/groupChat/delete?id=${id}`,{grpid},{ headers: { "Authorization": token }});
     
     console.log(Delete_member)
     const element = document.getElementById(id);
     element.parentNode.remove()
    } catch (error) {
        
    }
    
   
  
    

 }