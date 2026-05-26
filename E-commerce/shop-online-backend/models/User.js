import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name (required)
  email: {
    type: String,
    required: true,
    unique: true, // Must be unique for each user
  },
  password: { type: String, required: true }, // User's password (required)
  role: {
    type: String,
    enum: ["user", "admin"], // Either 'user' or 'admin'
    default: "user", // Default role is 'user'
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp of user creation
});

// Hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt); // Hash the password using the salt
  next(); // Continue with the save operation
});

// Define a method to compare entered password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model. If it already exists, use that; otherwise, create a new one.
export default mongoose.models.User || mongoose.model("User", userSchema);
