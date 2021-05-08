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
var port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log("Server is up and running on " + port);
});
//# sourceMappingURL=server.js.map