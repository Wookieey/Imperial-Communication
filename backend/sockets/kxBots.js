import ranks from "../utils/ranks.js";
import { kxModeration } from "../middleware/kxModeration.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import messageParser from "../utils/messageParsing.js";

// Main chat handler
export const handleChat = async (io, { roomId, user, content }) => {
    try {
        const sender = await User.findById(user._id);

        // KX moderation
        const modResult = kxModeration(content, sender);
        if (modResult.blockMessage) {
            // Optionally notify sender of moderation
            io.to(sender._id.toString()).emit("messageBlocked", modResult.reason);
            return null;
        }

        // Parse mentions (@user, @rank, @everyone)
        const mentions = messageParser(content);

        // Save message
        const message = await Message.create({
            roomId,
            sender: sender._id,
            content,
            mentions
        });

        // Notify mentioned users
        for (const mentionedUserId of mentions.users) {
            io.to(mentionedUserId.toString()).emit("mentioned", message);
        }

        // Notify users of mentioned ranks
        if (mentions.ranksNotified.length) {
            const usersToNotify = await User.find({
                rank: { $in: mentions.ranksNotified }
            });
            usersToNotify.forEach((u) =>
                io.to(u._id.toString()).emit("mentioned", message)
            );
        }

        // Handle @everyone (Moff+ only)
        if (mentions.everyone) {
            io.to(roomId).emit("everyoneMentioned", message);
        }

        // Return message for normal broadcast
        return await message.populate("sender", "username rank profilePic");
    } catch (err) {
        console.error("handleChat error:", err);
        return null;
    }
};
