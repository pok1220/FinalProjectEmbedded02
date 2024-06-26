// import "dotenv/config";
import "./db.js";
import app from "./app.js";
import User from "./itemModel.js";
import axios from "axios";
import Netrouter from "./router.js";

app.use("/Netpie", Netrouter);
// axios.get('http://localhost:3000/updatePoint')
// .then(async ()=>{
//     await fetch("localhost:3000/updatePoint?addPoint=true")
//     .then(res => res.json());
// })


app.use("/", async (req, res) =>{
    const user = await User.find({});
    res.send(user);
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

const port = 3000;

app.listen(port, ()=>{
    console.log("Server run");
})

