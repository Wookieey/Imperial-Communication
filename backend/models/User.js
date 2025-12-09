import mongoose from "mongoose";
import ranks from "../utils/ranks.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: { type: String, required: true },

    rank: {
        type: String,
        enum: Object.keys(ranks),
        default: "Stormtrooper"
    },

    bio: { type: String, default: "" },

    profilePic: { type: String, default: "" }, // will store file path

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure only ONE Emperor exists
userSchema.pre("save", async function (next) {
    if (this.rank !== "Emperor") return next();

    const existing = await mongoose.model("User").findOne({ rank: "Emperor" });
    if (existing && existing._id.toString() !== this._id.toString()) {
        throw new Error("There can only be one Emperor.");
    }
    next();
});

export default mongoose.model("User", userSchema);
