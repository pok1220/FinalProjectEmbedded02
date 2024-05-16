import express from "express";
import User from "./itemModel.js"
// import User from "./itemModel.js";
import * as itemController from "./netpieController.js";

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
            await User.updateMany({Current : true}, {$set : {Current : false}});
            await User.updateOne({username : req.body.username}, {$set : {Current : true}});
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
      // console.log("user");
      if(!user){res.status(200).json({ username :  null , message : "forgot your name?"})}
      else{
        if (user.password == req.body.password){
            await User.updateMany({Current : true}, {$set : {Current : false}});
            await User.updateOne({username : req.body.username}, {$set : {Current : true}})
          res.status(200).json(user);

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
    const CurrentUser = await User.findOne({Current : true});
    
    
    if(CurrentUser != [] && addPoint == "true"){
        

        await User.updateOne({Current : true}, {$set : {point : CurrentUser.point + 1}});
        res.send(await User.find({}));
    }
    else{
        console.log(CurrentUser);
        console.log(typeof(CurrentUser))
        console.log(typeof(req.query.addPoint));
        res.send(req.query.addPoint)
    }
  })
  router.get("/changePoint", async (req, res) => {
    const {reducePoint} = req.query;
    console.log(parseInt(reducePoint));
    console.log(typeof(reducePoint));
    const CurrentUser = await User.findOne({Current : true});
    if(CurrentUser != []){
        
        if(CurrentUser.point - parseInt(reducePoint) >= 0){
            await User.updateOne({Current : true}, {$set : {point : CurrentUser.point - parseInt(reducePoint)}});
            res.send(await User.find({}));
        }
        else{
            res.send("not enough point")
        }
    }

  })
  
  
  export default router;
