import mongoose from "mongoose";

const governorateSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    governorate_name_en: { type: String, required: true },
    shipping_price: { type: Number, required: true },
  },
  { _id: false },
);

export const Governorate =
  mongoose.models.Governorate ||
  mongoose.model("Governorate", governorateSchema);

const citySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    governorate_id: { type: String, required: true },
    city_name_en: { type: String, required: true },
    shipping_price: { type: Number },
  },
  { _id: false },
);

export const City = mongoose.models.City || mongoose.model("City", citySchema);
