import { handleChat } from "./kxBots.js";

const initSockets = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // Join rooms
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);
        });

        // Leave rooms
        socket.on("leaveRoom", (roomId) => {
            socket.leave(roomId);
            console.log(`${socket.id} left room ${roomId}`);
        });

        // Handle incoming messages
        socket.on("chatMessage", async (data) => {
            // data: { roomId, user, content }
            const processed = await handleChat(io, data);
            if (processed) {
                io.to(data.roomId).emit("newMessage", processed);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

export default initSockets;
