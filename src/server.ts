import "reflect-metadata";
require("dotenv").config();

import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import userRouter from "./routes/users";
import chatRouter from "./routes/chat"

const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

createConnection({
  type: "postgres",
  database: process.env.DB_database,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts", "entity/**/*.js"],
})
  .then(async (connection) => {
    console.log("Express application is up and running on port 5000");
    app.use("/v1", userRouter);
    app.use("/v1", chatRouter);

    const port = process.env.PORT || 5000;

    server.listen(port, () => {
      console.log(`Server is up and running on ${port}`);
    });
  })
  .catch((error) => console.log(error));
