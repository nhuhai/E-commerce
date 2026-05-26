import express from "express";
import Product from "../../models/Product.js";
import Review from "../../models/Review.js";
import Deal from "../../models/Deal.js";

const router = express.Router();

// GET /api/products - Fetch products with pagination
router.get("/products", async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 20;

    const products = await Product.find()
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// GET /api/products/deals - Fetch all product deals
router.get("/products/deals", async (req, res) => {
  try {
    const deals = await Deal.find();

    // Format data to ensure correct types
    const formattedDeals = deals.map((deal) => ({
      _id: deal._id,
      name: deal.name,
      price: Number(deal.originalPrice) || 0,
      dealPrice: Number(deal.dealPrice) || 0,
      image: deal.image,
      stock: deal.stock || 10,
      brand: deal.brand,
      category: deal.category,
      description: deal.description,
      discountPercentage: Number(deal.discountPercentage) || 0,
      isActive: deal.isActive,
    }));

    res.json(formattedDeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch deals" });
  }
});

// GET /api/products/search?name=... - Search for products by name or description
router.get("/products/search", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(name, "i"); // case-insensitive search

    const products = await Product.find({
      $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/products/:id - Fetch single product by ID along with reviews
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = await Review.find({ productId: req.params.id })
      .populate("userId", "name") // populate user name only
      .sort({ createdAt: -1 });

    res.json({ product, reviews });
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/products/:id/reviews - Add a review for a product
router.post("/products/:id/reviews", async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;

  try {
    // Create a new review document
    const review = new Review({
      userId: req.user?._id || null, // fallback if auth middleware is not set
      productId,
      rating,
      comment,
    });

    await review.save();

    // Get all reviews for the product to calculate average rating
    const reviews = await Review.find({ productId });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    // Update the product with the new rating and number of reviews
    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
