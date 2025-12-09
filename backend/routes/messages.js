import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import messageParser from "../utils/messageParsing.js";
import Message from "../models/Message.js";
import Room from "../models/Room.js";
import ranks from "../utils/ranks.js";

const router = express.Router();

// Fetch messages for a room
router.get("/:roomId", authenticateUser, async (req, res) => {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId })
        .populate("sender", "username rank profilePic")
        .sort({ createdAt: 1 });

    res.json(messages);
});

// Delete message (Captain+ over Stormtroopers)
router.delete("/:messageId", authenticateUser, async (req, res) => {
    const { messageId } = req.params;

    const message = await Message.findById(messageId).populate("sender");

    if (!message) return res.status(404).json({ message: "Message not found." });

    const actorRank = ranks[req.user.rank];
    const targetRank = ranks[message.sender.rank];

    // Can delete only messages from *lower* ranks
    if (actorRank <= targetRank) {
        return res.status(403).json({
            message: "Your rank is not high enough to delete this message."
        });
    }

    await Message.findByIdAndDelete(messageId);
    res.json({ message: "Message deleted." });
});

export default router;
