import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  dealPrice: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

export default mongoose.models.Deal || mongoose.model("Deal", dealSchema);
