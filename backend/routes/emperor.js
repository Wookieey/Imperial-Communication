import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { requireRank } from "../middleware/ranks.js";
import emperorAI from "../services/emperorAI.js";

const router = express.Router();

// Emperor-only coding + suggestions
router.post(
    "/omega",
    authenticateUser,
    requireRank("Emperor"),
    async (req, res) => {
        const { prompt } = req.body;

        const response = await emperorAI(prompt);

        res.json({ omegaReply: response });
    }
);

export default router;
