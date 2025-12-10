import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function verifySocketToken(socket, next) {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Missing token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    next(new Error("Auth failed"));
  }
}
