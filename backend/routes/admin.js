import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { requireRank } from "../middleware/ranks.js";
import ranks from "../utils/ranks.js";
import User from "../models/User.js";
import Ban from "../models/Ban.js";
import RankLog from "../models/RankLog.js";

const router = express.Router();

// Promote user (Captain+)
router.post(
    "/promote",
    authenticateUser,
    requireRank("Captain"),
    async (req, res) => {
        const { targetUsername, newRank } = req.body;

        const target = await User.findOne({ username: targetUsername });
        if (!target) return res.status(404).json({ message: "User not found." });

        const actorWeight = ranks[req.user.rank];
        const newRankWeight = ranks[newRank];

        if (newRankWeight >= actorWeight) {
            return res.status(403).json({
                message: "You cannot promote someone to your rank or above."
            });
        }

        const oldRank = target.rank;

        target.rank = newRank;
        await target.save();

        await RankLog.create({
            actionBy: req.user._id,
            targetUser: target._id,
            oldRank,
            newRank
        });

        res.json({ message: `Promoted ${target.username} to ${newRank}.` });
    }
);

// Ban user (Grand Moff+)
router.post(
    "/ban",
    authenticateUser,
    requireRank("Grand Moff"),
    async (req, res) => {
        const { username, reason } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found." });

        if (user.rank === "Emperor") {
            return res.status(403).json({ message: "You cannot ban the Emperor." });
        }

        await Ban.create({
            userId: user._id,
            bannedBy: req.user._id,
            reason
        });

        res.json({ message: `${username} has been banned.` });
    }
);

export default router;
