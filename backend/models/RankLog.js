import mongoose from "mongoose";

const rankLogSchema = new mongoose.Schema({
    actionBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    oldRank: { type: String, required: true },
    newRank: { type: String, required: true },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("RankLog", rankLogSchema);
