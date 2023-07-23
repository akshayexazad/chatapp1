async function login(event){
  try {
    event.preventDefault();
    const email =  event.target.email.value;
    const password =  event.target.password.value;
    let obj = {
        email,password
    };

  const loginreponse =  await axios.post('http://localhost:3001/user/login',obj);
  console.log(loginreponse)
  localStorage.setItem('token',loginreponse.data.token);
  document.getElementById("success-msg").innerText = loginreponse.data.message ;
  window.location.href = '../HTML/chat.html';
  }catch (error) {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
    console.log(error)
  }
        
}