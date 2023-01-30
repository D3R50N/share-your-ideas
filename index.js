const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const config = require("./config");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  //   socket.emit("request" /* … */); // emit an event to the socket
  //   io.emit("broadcast" /* … */); // emit an event to all connected sockets
  //   socket.on("reply", () => {
  //     /* … */
  //   }); // listen to the event
});

http.listen(config.port, () => {
  console.log(`Server is running on port http://localhost:${config.port}`);
});
