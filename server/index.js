const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

// We say new because we are creating a new instance of the Server class.
const io = new Server(server, {
    cors: {
        // origin of where your frontend will be
        origin: "http://localhost:3000",
        // methods that are allowed to be sent to the server
        methods: ["GET", "POST"],
    }
});

// We are listening for a connection event.
io.on("connection", (socket) => {
    console.log(`A User Connected: ${socket.id}`);

    // When a user joins a room, we emit an event to the room.
    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        // console.log(data, "User Data received");
        // We emit an event to the room.
        socket.to(data.room).emit("receive_message", data);
    }
    );
});
server.listen(3001, () => { });