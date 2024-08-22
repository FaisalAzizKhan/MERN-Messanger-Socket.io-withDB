const { Server } = require("socket.io");

const backSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // In production, replace '*' with your specific origin(s)
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User Connected", socket.id);

        // Send the message to a specific socket ID
        socket.on('privateMessage', ({ content, to, name, senderid}) => {
            console.log(content, to)
            io.to(to).emit('privateMessage', { content, from: socket.id, name, senderid});
          });

          socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
          });
    });

    return io;
}

module.exports = backSocket;
