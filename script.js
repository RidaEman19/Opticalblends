function login() { 
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const emailmessage = document.getElementById("emailmessage");
    const passwordmessage = document.getElementById("passmessage");
    const mainmessage = document.getElementById("mainmessage");

emailmessage.textContent="";
passwordmessage.textContent="";
mainmessage.textContent = "";



    if (email === "" && password === "") {
        emailmessage.textContent="fill the email fields."
        passwordmessage.textContent="fill the password fields."

        return false;
    }
    else if(email === "" || password === ""){
        if(email===""){
 emailmessage.textContent="fill the email fields."
   
        }
        else{
               passwordmessage.textContent="fill the password fields."
        }

        return false;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];



    const loggedIn = users.some(user => 
        user.email === email && user.pass === password
    );
    if (loggedIn) {
        
        mainmessage.textContent = "Login successful! Redirecting...";
        window.location.href = "header.html";
           return false;
    } else {
        
       mainmessage.textContent= "Invalid email or password. Please register or try again.";
      return false;
    }
 
}

function password() { 
    const passwordField = document.getElementById('password'); 
    const toggleIcon = document.getElementById('togglePassword');

    if (passwordField.type === 'password') {       
       passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
     
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}
