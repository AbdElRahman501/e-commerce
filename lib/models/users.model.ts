import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "name required."],
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
