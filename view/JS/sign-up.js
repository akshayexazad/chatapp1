async function sign_up(event) {
    try {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone_no = event.target.phone_number.value;
        const password = event.target.password.value;
        let obj = {
            name, email, phone_no, password
        };
        
        const signupresponse = await axios.post('http://localhost:3001/user/sign-up', obj)

        document.getElementById("success-msg").innerText = 'User Created Successfully..';
        window.location.href = '../HTML/login.html';
    } catch (error) {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
        console.log(error)
    }

}