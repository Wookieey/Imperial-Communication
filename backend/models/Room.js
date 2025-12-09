import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },

    minRankWeight: { type: Number, default: 1 }, // Stormtrooper default

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    kxUnitId: { type: String, required: true }, // ex: "KX-13"

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Room", roomSchema);
