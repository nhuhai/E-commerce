// Import required packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import custom modules
import connectDB from "./lib/dbConnect.js"; // MongoDB connection
import authRoutes from "./api/auth/userRoutes.js"; // User authentication routes
import productRoutes from "./api/auth/productRouters.js"; // Product-related routes

// Load environment variables from .env file
dotenv.config({ quiet: true });

// Initialize express app
const app = express();

// Set the server port from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors({ origin: "*" })); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON payloads

// Connect to MongoDB
connectDB();

// Define routes
app.use("/api/user", authRoutes); // Routes for user signup and login
app.use("/api", productRoutes); // Routes for products (listing, details, etc.)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
