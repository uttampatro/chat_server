import cookieParser from "cookie-parser";
import "reflect-metadata";
import { createConnection } from "typeorm";
import userRouter from "./routes/users";

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

// user routes
app.use('/api', userRouter);

createConnection({
  type: "postgres",
  database: process.env.DB_database,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts", "entity/**/*.js"],
})
  .then(async (connection) => {
    console.log("Express application is up and running on port 8000");
  })
  .catch((error) => console.log(error));

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});


