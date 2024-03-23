import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    keywords: { type: String, required: true },
    images: { type: Map, of: Array },
    categories: { type: String, required: true },
    price: { type: Number, required: true },
    minPrice: { type: Number, required: true, default: 0 },
    sizes: [String],
    colors: [String],
    description: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    gender: { type: String, required: true, default: "all" },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
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

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
