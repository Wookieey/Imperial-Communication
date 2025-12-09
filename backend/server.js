import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import roomRoutes from "./routes/rooms.js";
import messageRoutes from "./routes/messages.js";
import adminRoutes from "./routes/admin.js";
import emperorRoutes from "./routes/emperor.js";

import initSockets from "./sockets/index.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// CORS
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/messages", messageRoutes);
app.use("/admin", adminRoutes);
app.use("/emperor", emperorRoutes);

// Socket.io Initialization
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN,
        methods: ["GET", "POST"]
    }
});

initSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Imperial ComNet Backend running on port ${PORT}`));
