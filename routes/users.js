const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.get("/register", (req, res)=>{
    res.render("register")
})

router.post("/register", (req, res)=>{
    User.create(req.body, (err, user)=>{
        req.session.sessionFlash = {
            message: "User was created successfully"
        }
        res.redirect("/users/login")
    })
})

router.get("/login", (req, res) =>{
    res.render("login")
})

router.post("/login", (req, res) =>{
    const {email, password} = req.body
    User.findOne({email}, (err, user)=>{
        if(user && user.password === password){
            req.session.userId = user._id
            res.redirect("/")
        }else{
            res.redirect("/users/login")
        }
    })
})

router.get("/logout", (req, res, next) =>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
})


module.exports = router;