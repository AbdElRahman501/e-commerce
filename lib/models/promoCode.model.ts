import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    limit: { type: Number, required: true },
    active: { type: Boolean, required: true },
    maxDiscount: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const PromoCode =
  mongoose.models.PromoCode || mongoose.model("PromoCode", promoCodeSchema);
export default PromoCode;
