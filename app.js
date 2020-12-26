const express = require("express")
const mongoose = require('mongoose');
const main = require("./routes/main")
const addPost = require("./routes/addPost")
const blogSingle = require("./routes/blog-single")
const users = require("./routes/users")
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const expressSession = require("express-session")
const MongoStore = require('connect-mongo')(expressSession);
const admin = require("./routes/admin/index")

const app = express()
const port = 3000
const host = "localhost"
const path = require("path")



app.use(urlencodedParser)

app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

mongoose.connect('mongodb://localhost/nodeblog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(expressSession({
  secret: "testtest",
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Flash Message Middleware

app.use((req, res, next) =>{
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})

app.use((req, res, next) =>{
  const {userId} = req.session
  if(userId){
    res.locals.displayLink = true
  }else{
    res.locals.displayLink = false
  }
  next()
})

app.use(fileUpload())

app.use("/", main)
app.use("/addPost", addPost)
app.use("/blog-single", blogSingle)
app.use("/users", users)
app.use("/admin", admin)

app.listen(port, () => { console.log("I am listen") })

