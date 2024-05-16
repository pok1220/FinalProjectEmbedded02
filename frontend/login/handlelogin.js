
import { login } from "../api/api";
//import * as itemController from "../../data/api.js";
import * as itemController from "../api/api";
export async function handleLogin(){
    const usertologin = document.getElementById("username").value;
    const pswtologin = document.getElementById("password").value;
    const user = {
        username : usertologin,
        password : pswtologin,
    };
    const userloggedin = await login(user);
    if(await userloggedin.username != null){   
        localStorage.setItem('username',await userloggedin.username);
        localStorage.setItem("prevSoil", await itemController.getUserData().data.soil)
    }else{
        localStorage.removeItem('username');
        alert(userloggedin.message);
    }
    
}