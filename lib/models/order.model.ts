import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: { type: Number, required: true },
  selectedColor: { type: String, required: true },
  selectedSize: { type: String, required: true },
});

const personalInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  streetAddress: { type: String, required: true },
  state: { type: String, required: true },
  comment: { type: String },
  promoCode: { type: String },
  paymentMethod: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    products: { type: [productSchema], required: true },
    personalInfo: { type: personalInfoSchema, required: true },
    subTotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // Include virtual properties if any
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v; // Optionally remove the __v field if it exists
      },
    },
  },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
