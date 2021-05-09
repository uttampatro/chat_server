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
  entities: ["src/Entity/**/*.ts"],
})


const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});
