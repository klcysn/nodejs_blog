const express = require("express")
const router = express.Router()
const Post = require("../models/post")

router.get("/:id", (req, res)=>{
    Post.findById(req.params.id).then((post)=>{
        res.render("blog-single", {post: post})
    })
})


module.exports = router