import express from "express";
import auth from "../middleware/auth.js";
import Room from "../models/Room.js";
import { rankValue, canCreatePublicRoom, canCreatePrivateRoom } from "../utils/ranks.js";

const router = express.Router();

// List rooms user has access to
router.get("/list", auth, async (req, res) => {
  const all = await Room.find();
  const allowed = all.filter(r => r.allowedRanks.includes(req.user.rank));
  res.json(allowed);
});

// Create public room
router.post("/create/public", auth, async (req, res) => {
  if (!canCreatePublicRoom(req.user.rank))
    return res.status(403).json({ msg: "Insufficient rank to create public rooms" });

  const { name } = req.body;

  const room = await Room.create({
    name,
    type: "public",
    allowedRanks: [
      "Stormtrooper","Lieutenant","Captain","Commander","Major",
      "Colonel","General","Admiral","Moff","Grand Moff","Emperor"
    ],
    createdBy: req.user.id
  });

  res.json(room);
});

// Create private room
router.post("/create/private", auth, async (req, res) => {
  if (!canCreatePrivateRoom(req.user.rank))
    return res.status(403).json({ msg: "Insufficient rank to create private rooms" });

  const { name, allowedRanks } = req.body;

  const room = await Room.create({
    name,
    type: "private",
    allowedRanks,
    createdBy: req.user.id
  });

  res.json(room);
});

export default router;
