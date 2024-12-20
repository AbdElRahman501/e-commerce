import mongoose from "mongoose";

const subVariationsOptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    priceAdjustment: { type: Number, default: 0 },
    minPriceAdjustment: { type: Number, default: 0 },
    imageUrl: { type: String },
  },
  { _id: false },
); // Prevent _id from being added to options

const subVariationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    options: [subVariationsOptionSchema],
  },
  { _id: false },
); // Prevent _id from being added to the main schema

const optionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    priceAdjustment: { type: Number, default: 0 },
    minPriceAdjustment: { type: Number, default: 0 },
    imageUrl: { type: String },
    subVariations: [subVariationSchema],
  },
  { _id: false },
); // Prevent _id from being added to options

const variationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    options: [optionSchema],
  },
  { _id: false },
); // Prevent _id from being added to the main schema

const contentSchema = new mongoose.Schema(
  { name: String, html: String },
  { _id: false },
);
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    keywords: { type: String, required: true },
    images: [String],
    categories: { type: String, required: true },
    collections: [String],
    price: { type: Number, required: true },
    minPrice: { type: Number, required: true, default: 0 },
    variations: [variationSchema],
    description: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    gender: { type: String, required: true, default: "all" },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    content: [contentSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: any) {
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
