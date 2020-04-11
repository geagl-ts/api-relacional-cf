const io = require("socket.io-client");

const socket = io.connect("http://localhost:3000", { reconnection: true });

socket.on("connect", function () {
    console.log("\n\nServer en NodeJS\n\n");
});

module.exports = socket;
