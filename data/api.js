export async function register(userdata){
    const user = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((r) => r.json());
  
    return user;
  }
  
  export async function login(userdata){
    const user = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((r) => r.json());
    return user;
  }
  
  export async function updatePoint(addPoint){
    await fetch(`http://localhost:3000/updatePoint?addPoint=${addPoint}`)
  } //addpoint is true or false
  export async function getUserStatus(){
    const data = await fetch(`http://localhost:3000/Netpie/testNetPie1`)
    .then(res => res.json());
    return await data;
  }
  export async function getUserData(){
    const data = await fetch(`http://localhost:3000/Netpie/testNetPie2`)
    .then(res => res.json());
    return await data;
  } // return user data
  export async function reducePoint(reducePoint){
    await fetch(`http://localhost:3000/changePoint?newPoint=${reducePoint}`)
  } // reduce point from buy item
  export async function getCurrentUser(){
    const curUser = await fetch(`http://localhost:3000/getCurrentUser`)
    .then(data => data.json());
    return await curUser;
  }


