import express from "express";
import upload from "../services/upload.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

// Upload profile picture
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    profilePic: `/uploads/${req.file.filename}`
  });
  res.json({ msg: "Uploaded", file: req.file.filename });
});

export default router;
