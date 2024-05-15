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
    await fetch(`/updatePoint?addPoint=${addPoint}`)
  }