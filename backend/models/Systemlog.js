import mongoose from "mongoose";

const systemLogSchema = new mongoose.Schema({
    type: { type: String, required: true }, // "moderation", "security", "rank_abuse"
    details: { type: String, required: true },

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        default: null
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("SystemLog", systemLogSchema);
