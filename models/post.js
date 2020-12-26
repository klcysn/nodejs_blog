const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: String
    },
    post_file:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Post", PostSchema)