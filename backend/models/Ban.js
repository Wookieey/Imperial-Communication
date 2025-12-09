import mongoose from "mongoose";

const banSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    bannedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    reason: { type: String, required: true },

    createdAt: {
        type: Date,
        default: Date.now
    },

    expiresAt: { type: Date, default: null } // null = permanent
});

export default mongoose.model("Ban", banSchema);
