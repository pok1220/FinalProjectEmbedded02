import { handleRegister } from "./handlesignin.js";

const loginButton = document.getElementById("login-btn");
loginButton.addEventListener("click", async () => {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirm_password = document.getElementById('confirm-password').value;

    if(username === '' && (password === '' || confirm_password === '')) {
        alert('Please input Username and Password!');
    }
    else if(username === ''){
        alert('Please input Username!');
    }
    else if(password === ''){
        alert('Please input Password!');
    }
    else if(confirm_password === ''){
        alert('Please confirm password!');
    }
    else{
        if(password === confirm_password){
            await handleRegister();
            console.log(localStorage.getItem('username'));
            // if(localStorage.getItem('username') != "null") location.href = "feed.html";
            if(localStorage.getItem('username') == null){}
            else{
                console.log(localStorage.getItem('username'));
                location.href = "feed.html";
            }
        }else alert('Passwords are not matching!!!');
    }
});
function valid(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirm_password = document.getElementById('confirm-password').value;

    if(username === '' && (password === '' || confirm_password === '')) {
        alert('Please input Username and Password!');
    }
    else if(username === ''){
        alert('Please input Username!');
    }
    else if(password === ''){
        alert('Please input Password!');
    }
    else if(confirm_password === ''){
        alert('Please confirm password!');
    }
    else{
        if(password === confirm_password){
            location.href = "feed.html"; // go to after login
        }else alert('Passwords are not matching!!!');
    }
}