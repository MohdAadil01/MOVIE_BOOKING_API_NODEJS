import mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("✅ Database connected.");
  } catch (error) {
    console.log("❌ Error while connecting to database " + error);
  }
};

export default connectDb;
