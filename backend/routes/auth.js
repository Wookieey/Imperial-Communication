import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password, bio } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ msg: "Username already taken" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hash,
      bio
    });

    res.json({ msg: "User created", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, rank: user.rank },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
