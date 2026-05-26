import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: String,
  image: String,
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
