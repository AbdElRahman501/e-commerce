import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    keywords: { type: String, required: true },
    images: { type: Map, of: String },
    categories: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: [String],
    colors: [String],
    description: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    likes: { type: Number, required: true },
    gender: { type: String, required: true, default: "all" },
  },
  {
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
