import "reflect-metadata";
import { createConnection } from "typeorm";

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(cors());
app.use(express.json());


createConnection({
  type: "postgres",
  database: "chat_data",
  username: "uttam",
  password: "uttam",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts", "entity/**/*.js"],
}).then(async connection => {    

  console.log("Express application is up and running on port 8000");

}).catch(error => console.log(error));


const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});
