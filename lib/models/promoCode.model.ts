import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    limit: { type: Number, required: true },
    active: { type: Boolean, default: true },
    maxDiscount: { type: Number },
  },
  {
    timestamps: true,
  },
);

const PromoCode =
  mongoose.models.PromoCode || mongoose.model("PromoCode", promoCodeSchema);
export default PromoCode;
