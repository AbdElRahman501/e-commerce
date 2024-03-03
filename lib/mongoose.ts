import mongoose from "mongoose";

// let connection: mongoose.Connection

let isConnected = false; // track the connection

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return console.log("Please add your Mongo URI to .env.local");
  if (isConnected) return console.log("MongoDB already connected");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
