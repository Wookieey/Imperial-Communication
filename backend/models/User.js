import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  rank: { type: String, default: "Stormtrooper" },
  bio: { type: String, default: "" },
  profilePic: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
