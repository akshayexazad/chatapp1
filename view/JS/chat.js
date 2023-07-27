var token = localStorage.getItem('token');
var logout = document.getElementById('Logout');
var createGroup = document.getElementById('Create-group');
var view_groups = document.getElementById("available-groups")
// parse token



// send message


//refresh page

window.addEventListener("DOMContentLoaded", async () => {
  try {


    const loggedUserInfo = await axios.get(`http://localhost:3001/chat/userInfo`, { headers: { "Authorization": token } });
    const node = document.getElementById("user-present");
    node.innerText += `Hello ${loggedUserInfo.data.userName}!`
    

    printActiveUser(loggedUserInfo)

    


  } catch (error) {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
    console.log(error)
  }

})

// auto refresh after 1 sec
async function refresh1sec() {
  window.location.href = '../HTML/chat.html';

}
// let display = setInterval(refresh1sec, 1000);

//for log out
logout.addEventListener('click', async () => {
  try {
    const logoutresponse = await axios.get(`http://localhost:3001/chat/logout`, { headers: { "Authorization": token } });
    localStorage.removeItem('token')
    window.location.href = '../HTML/login.html'
  } catch (error) {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
    console.log(error)
  }

});

// print active user
function printActiveUser(loggedUserInfo) {
  for (let j = 0; j < loggedUserInfo.data.activeUser.length; j++) {
    const activeusr = document.getElementById("for-active-user");
    const createlm = document.createElement('div');
    const text = document.createTextNode(loggedUserInfo.data.activeUser[j].name);
    activeusr.appendChild(createlm).appendChild(text);
  }
}

// creating group

createGroup.addEventListener('click', async () => {
  try {
    // const decodetoken = parseJwt(token)

    const parentNode = document.getElementById("for-chat-message");
    const childHTML = `<form onsubmit="createChatGroup(event)">
    <h2>Create Group</h2>
    <input type="text" name="groupchatname" required> <br><br>
     <button type="submit">Create</button>
    </form> `
    parentNode.innerHTML = childHTML;

  } catch (error) {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
    console.log(error)
  }

})

//for Creating group
async function createChatGroup(event) {
  event.preventDefault();

  try {
    const groupname = event.target.groupchatname.value;

    const groupInfo = await axios.post(`http://localhost:3001/groupChat/CreateGroup`, { groupname }, { headers: { "Authorization": token } });

    window.location.href = '../HTML/groupChat.html'
  } catch (error) {
    console.log(error)
  }

};

view_groups.addEventListener('click', () => {
  window.location.href = "../HTML/groupChat.html"
})