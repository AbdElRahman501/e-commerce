import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  image: { type: String, required: true },
  start: { type: String },
  end: { type: String },
  url: { type: String },
});

export const Story =
  mongoose.models.Story || mongoose.model("Story", storySchema);

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  images: { type: [String] },
});

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);

const navbarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  main: { type: Boolean, default: false },
});

export const NavBarLink =
  mongoose.models.NavBarLink || mongoose.model("NavBarLink", navbarSchema);
