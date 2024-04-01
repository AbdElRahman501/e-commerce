import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  image: { type: String, required: true },
  start: { type: String },
  end: { type: String },
  url: { type: String },
});

export const Story =
  mongoose.models.Story || mongoose.model("Story", storySchema);
