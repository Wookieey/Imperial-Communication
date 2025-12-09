import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { requireRank } from "../middleware/ranks.js";
import ranks from "../utils/ranks.js";
import Room from "../models/Room.js";

const router = express.Router();

// Create private room (Commander+)
router.post(
    "/createPrivate",
    authenticateUser,
    requireRank("Commander"),
    async (req, res) => {
        const { name, minRank } = req.body;

        const newRoom = await Room.create({
            name,
            isPrivate: true,
            minRankWeight: ranks[minRank] || 1,
            createdBy: req.user._id,
            kxUnitId: "KX-" + Math.floor(Math.random() * 1000)
        });

        res.json(newRoom);
    }
);

// Create public room (Admiral+)
router.post(
    "/createPublic",
    authenticateUser,
    requireRank("Admiral"),
    async (req, res) => {
        const { name, minRank } = req.body;

        const newRoom = await Room.create({
            name,
            isPrivate: false,
            minRankWeight: ranks[minRank] || 1,
            createdBy: req.user._id,
            kxUnitId: "KX-" + Math.floor(Math.random() * 1000)
        });

        res.json(newRoom);
    }
);

// List rooms user has access to
router.get("/list", authenticateUser, async (req, res) => {
    const weight = ranks[req.user.rank];

    const rooms = await Room.find({
        minRankWeight: { $lte: weight }
    });

    res.json(rooms);
});

export default router;
