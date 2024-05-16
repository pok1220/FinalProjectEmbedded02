//import { handleLogin } from "./handlelogin.js";
import { handleLogin } from "./handlelogin";
const loginButton = document.getElementById('login-btn');
loginButton.addEventListener("click", async () => {
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
        if(localStorage.getItem('username') == null){}
        else{location.href = "feed.html";}
    }
});
function valid(){
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
        localStorage.setItem('username', document.getElementById('username').value);
        location.href = "feed.html";
    }
};
