import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    sale: { type: Number, required: true },
    category: { type: String, required: true },
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

const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);
export default Offer;
