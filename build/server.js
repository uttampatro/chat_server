"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var socketio = require("socket.io");
var http = require("http");
var cors = require("cors");
var app = express();
var server = http.createServer(app);
var io = socketio(server, { cors: { origin: "*" } });
io.on("connection", function (socket) {
    console.log(socket.id);
    socket.on("disconnect", function () {
        console.log("User disconnected");
    });
});
app.use(cors());
app.use(express.json());
typeorm_1.createConnection({
    type: "postgres",
    database: "chat_data",
    username: "uttam",
    password: "uttam",
    synchronize: true,
    logging: true,
    entities: ["src/Entity/**/*.ts"],
});
var port = process.env.PORT || 5000;
server.listen(port, function () {
    console.log("Server is up and running on " + port);
});
//# sourceMappingURL=server.js.map