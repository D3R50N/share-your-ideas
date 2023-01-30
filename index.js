const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const config = require("./config");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);


const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "Post 1 content",
    likes : 12,
  },
  {
    id: 2,
    title: "Post 2",
    content: "Post 2 content",
    likes: 12,
  },
  {
    id: 3,
    title: "Post 3",
    content: "Post 3 content",
    likes: 12,
  },
]


app.use(express.static("public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use(cors());



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


io.on("connection", (socket) => {
  //   socket.emit("request" /* … */); // emit an event to the socket
  //   io.emit("broadcast" /* … */); // emit an event to all connected sockets
  socket.on("like", (post_id) => {
    // console.log(post_id);
    let post = posts.find((post) => post.id == post_id);
    post.likes++;
    // io.emit("update", post);
    io.emit("posts", posts);
  }); // listen to the event
  socket.emit("welcome", random_uid());
  socket.emit("posts", posts);
});

http.listen(config.port, () => {
  console.clear();
  console.log(`Server is running on ${config.url}`);
});


function random_uid
  () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }