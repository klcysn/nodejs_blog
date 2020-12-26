const express = require("express")
const router = express.Router()
const Post = require("../models/post")
const path = require("path")
const moment = require('moment')

router.get("/", (req, res)=>{
    if(req.session.userId){
        res.render("addPost")
    }else{
        res.redirect("/users/login")
    }
})


router.post("/test", (req, res)=>{
    let post_file = req.files.post_file
    post_file.mv(path.resolve(__dirname, "../public/img/postimages", post_file.name))
    Post.create({
        ...req.body,
        date: moment(Date.now()).format("MMM DD YYYY"),
        post_file: `/img/postimages/${post_file.name}`
    }, )
    req.session.sessionFlash = {
        type: "alert alert-success",
        message: "Post created successfully"
    }
    res.redirect("/blog")
})

module.exports = router;