import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content: {
        type: String,
        required: true
    },

    mentions: {
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        ranksNotified: [String],
        everyone: { type: Boolean, default: false }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Message", messageSchema);
