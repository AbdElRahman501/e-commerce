import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  sale: { type: Number, required: true },
  category: { type: String, required: true },
});

const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);
export default Offer;
