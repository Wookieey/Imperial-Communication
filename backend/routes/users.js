import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import upload from "../middleware/fileUpload.js";
import User from "../models/User.js";

const router = express.Router();

// Get own profile
router.get("/me", authenticateUser, async (req, res) => {
    res.json(req.user);
});

// Update bio
router.post("/bio", authenticateUser, async (req, res) => {
    const { bio } = req.body;

    req.user.bio = bio;
    await req.user.save();

    res.json({ message: "Bio updated." });
});

// Upload profile picture
router.post(
    "/upload",
    authenticateUser,
    upload.single("profilePic"),
    async (req, res) => {
        req.user.profilePic = req.file.path;
        await req.user.save();

        res.json({
            message: "Profile picture updated.",
            path: req.file.path
        });
    }
);

export default router;
