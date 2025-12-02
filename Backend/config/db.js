import mongoose from "mongoose";
import { Enrollment } from "../models/AdminModel.js"; // make sure path is correct

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Sync indexes once on startup
    await Enrollment.syncIndexes();
    console.log("Enrollment indexes synced");
  } catch (err) {
    console.error("Connection Error", err);
  }
};

export default connectDB;
