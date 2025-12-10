import express from "express";
import auth from "../middleware/auth.js";
import Message from "../models/Message.js";

const router = express.Router();

// Fetch messages for room
router.get("/:roomId", auth, async (req, res) => {
  const msgs = await Message.find({ roomId: req.params.roomId }).populate("sender");
  res.json(msgs);
});

export default router;
