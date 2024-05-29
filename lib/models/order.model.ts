import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: { type: Number, required: true },
  selectedOptions: { type: Map, of: String },
});

const personalInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  streetAddress: { type: String, required: true },
  state: { type: String, required: true },
  messageAccept: { type: Boolean },
  city: { type: String, required: true },
  comment: { type: String },
  promoCode: { type: String },
  paymentMethod: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    products: { type: [productSchema], required: true },
    personalInfo: { type: personalInfoSchema, required: true },
    subTotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
