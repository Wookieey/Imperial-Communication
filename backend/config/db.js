import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected to Imperial Database Cluster");
    } catch (error) {
        console.error("MongoDB Connection Error: ", error.message);
        process.exit(1);
    }
};

export default connectDB;
