const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const {User,Likes, Posts} = require('../models');

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {});
});

//session data

router.get("/sessiondata",(req,res)=>{
  res.json(req.session)
})  


router.get("/signup",(req,res)=>{
    res.render("signup")
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.get("/logout",(req,res)=>{
    res.render("logout");
});

// Login route

router.post("/login",(req,res)=>{
    //1. find the user who is trying to login
    res.render("login");
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            res.status(401).json({msg:"Invalid username/password"})
        } else {
            if(!bcrypt.compareSync(req.body.password,foundUser.password)){
                res.status(401).json({msg:"Invalid username/password"})
            } else {
                req.session.user = {
                    id:foundUser.id,
                    username:foundUser.username
                }
                res.json(foundUser)
            }
        }
    })
})

router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.send("logged out!")
})


module.exports = router;