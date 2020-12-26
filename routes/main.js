const express = require("express")
const router = express.Router()
const Post = require("../models/post")

router.get("/", (req, res) => {
    res.render("index.ejs")
})

router.get("/admin", (req, res) => {
    res.render("admin.ejs")
})

router.get("/blog", (req, res) => {
    Post.find({}).then((posts)=>{
        res.render("blog.ejs", {posts:posts})
    })
})

router.get("/contact", (req, res) => {
    res.render("contact")
})


module.exports = router;