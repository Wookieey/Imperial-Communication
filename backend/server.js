import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { verifySocketToken } from "./middleware/authSocket.js";
import handleSocketEvents from "./socket/socketHandler.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/messages", messageRoutes);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.use(verifySocketToken);

io.on("connection", (socket) => {
  console.log("User connected:", socket.user.username);
  handleSocketEvents(io, socket);
});

// Start Server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Imperial Server active on port ${PORT}`);
});
