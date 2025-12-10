import Message from "../models/Message.js";

export default function handleSocketEvents(io, socket) {
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ roomId, content }) => {
    const msg = await Message.create({
      roomId,
      content,
      sender: socket.user._id,
      mentions: []  // add mention parsing later
    });

    io.to(roomId).emit("newMessage", {
      ...msg._doc,
      sender: socket.user
    });
  });
}
