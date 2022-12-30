// //jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import ejs from  "ejs";
import mongoose from 'mongoose';
import Post from './models/Post.js';  //calling model
import web from './routes/web.js';
const app = express();  //this is simply a function that reprents the express module;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
 mongoose.connect("mongodb+srv://admin-sparsh:Test123@realmcluster.q1n0s.mongodb.net/EventMagazine", { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/BlogDB2", { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', web);
app.get("/compose", web);
app.post("/compose", web);
app.post("/posts/:postId", web);
app.get("/posts/:postId", web);
app.get("/about", web);
app.get("/contact", web);
app.get("/login", web);
app.post("/login", web);
app.get("/signup", web);
app.post('/signup', web);
app.post("/userPost", web);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server has started successfully");
});     