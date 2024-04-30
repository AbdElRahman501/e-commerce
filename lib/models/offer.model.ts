import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  url: { type: String, required: true },
  description: { type: String },
  sale: { type: Number, default: 0 },
  category: { type: String },
  active: { type: Boolean, default: true },
});

const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);
export default Offer;
