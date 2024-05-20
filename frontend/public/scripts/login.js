import { handleLogin } from "./handlelogin.js";
// import { handleLogin } from "./handlelogin/";
// import * as handleLogin from "./handlelogin.js";



document.getElementById('login-btn').addEventListener("click", async () => {
    if(document.getElementById('username').value === '' && document.getElementById('password').value === ''){
        alert('Please input Username and Password!');
    }
    else if(document.getElementById('username').value === ''){
        alert('Please input Username!');
    }
    else if(document.getElementById('password').value === ''){
        alert('Please input Password!');
    }
    else{
        await handleLogin();
        if(localStorage.getItem('username') == null){
            
        }
        else{location.href = "../index2.html";}
    }
});

