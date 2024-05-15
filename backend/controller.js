import express from "express";
import User from "./itemModel.js"
// import User from "./itemModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      //check pass
      if(req.body.password == req.body.confirmpassword){
          const user = await User.findOne({ username: req.body.username });
          if(!user){
            //create new user
            const newUser = new User({
              username: req.body.username,
              password: req.body.password,
            });
    
            //save user and respond
            const user = await newUser.save();
            console.log(user)
            res.status(200).json(user);
          }else{
            console.log("already have user");
            res.status(200).json({ username : null , message : "name already used"});
          }
            
      }else{
        console.log("psw err");
        res.status(200).json({ username :  null , message : "password not match"});
      }
      
    } catch (err) {
      //res.status(400).json("cant create acc");
      console.log("other")
      res.status(500).json({ username :  null, message : "can't create account"})
    }
  });
  
  //LOGIN
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if(!user){res.status(200).json({ username :  null , message : "forgot your name?"})}
      else{
        if (user.password == req.body.password){
          res.status(200).json(user)
      }
      else{
          res.status(200).json({ username : null , message : "wrong password"})
      }
      }
      
      
    } catch (err) {
      
      res.status(500).json({ username :  null , message : "can't login"})
      
    }
  });
  router.get("/updatePoint", async (req, res) => {
    const {addPoint} = req.query;

    if(localStorage.getItem('username') != null && addPoint){
        const Player = await User.findOne({username : localStorage.getItem("username")});

        await User.updateOne({username : Player.username}, {$set : {point : Player.point + 1}});
    }
    else{

    }
  })
  export default router;
