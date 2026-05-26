// routes/auth.js
import express from "express";
import User from "../../models/User.js"; // Import the User model
import jwt from "jsonwebtoken"; // For generating authentication tokens

const router = express.Router(); // Create a new Express router

// ========================
// Signup Route
// ========================
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received");

    const { name, email, password } = req.body; // Extract user details from the request body
    console.log("Request Body:", { name, email, password });

    // Check if user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" }); // Return error if email is already used
    }

    // Create a new user document
    const user = await User.create({ name, email, password });
    console.log("User created with ID:", user._id);

    // Respond with success and new user ID
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    console.error("Signup error:", err.message);
    //  Return 500 if any server error occurs
    res.status(500).json({ error: err.message });
  }
});

// ========================
// Login Route
// ========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Extract credentials

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" }); // Unauthorized
    }

    // Check if password is correct using model method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Password mismatch for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //  Generate JWT token valid for 7 days
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return user info (excluding password) and the token
    const { _id, name, role } = user;

    res.status(200).json({
      message: "Login successful",
      token,
      user: { _id, name, email, role },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    // Handle internal server errors
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router; // Export the router to use in main server file
