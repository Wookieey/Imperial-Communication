import Room from "../models/Room.js";
import ranks from "../utils/ranks.js";

export const verifyRoomAccess = async (req, res, next) => {
    const user = req.user;
    const { roomId } = req.params;

    try {
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: "Room not found." });
        }

        const userRankWeight = ranks[user.rank];

        if (userRankWeight < room.minRankWeight) {
            return res.status(403).json({
                message: "Your rank is too low to access this room."
            });
        }

        req.room = room;
        next();
    } catch (err) {
        res.status(500).json({ message: "Room access verification failed." });
    }
};
