
import { register } from "../api/api";
export async function handleRegister(){
    const usertoreg = document.getElementById("username").value;
    const pswtoreg = document.getElementById("password").value;
    const cfpswtoreg = document.getElementById("confirm-password").value;
    const user = {
        username : usertoreg,
        password : pswtoreg,
        confirmpassword : cfpswtoreg,
    };
    const userloggedin = await register(user);
    // if(await userloggedin.username == "erruser"){
    //     localStorage.setItem('username',"null");
    // }else{
    //     localStorage.setItem('username',await userloggedin.username);
    // }
    if(await userloggedin.username != null){
        console.log(localStorage.getItem('username'));
        localStorage.setItem('username',await userloggedin.username);
        localStorage.setItem("prevSoil", await itemController.getUserData().data.soil)
        console.log(localStorage.getItem('username'));
    }else{
        console.log(localStorage.getItem('username'));
        localStorage.removeItem('username');
        alert(userloggedin.message);
        console.log(toString(userloggedin.message));
        console.log(localStorage.getItem('username'));
    }
}