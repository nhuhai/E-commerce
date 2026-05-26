"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // <-- Import useRouter
import Image from "next/image";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Loader from "../../components/Loader";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Review = {
  _id: string;
  userId?: { name: string };
  rating: number;
  comment: string;
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  rating: number;
  numReviews: number;
};

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <-- State to track login status

  // Review form states
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // In a real application, you'd fetch the user's session or token here.
  useEffect(() => {
    // This is a placeholder. Replace this with your actual authentication check.
    // For example, checking for a token in a cookie or localStorage.
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/products/${id}`,
      );
      setProduct(res.data.product);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error("Error fetching product", error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error("Please provide a rating and comment");
      return;
    }

    // Redirect to login if not authenticated for submitting a review
    if (!isLoggedIn) {
      router.push("/login");
      toast.info("Please log in to submit a review.");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/products/${id}/reviews`,
        { rating, comment },
      );
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      fetchProduct(); // refresh reviews
    } catch (error) {
      console.error("Error submitting review", error);
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddToCart = () => {
    // First, check if the user is logged in
    if (!isLoggedIn) {
      router.push("/login");
      toast.info("Please log in to add items to your cart.");
      return;
    }

    if (!product) return;
    if (product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      quantity,
    });

    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  if (loading) return <Loader text="Loading product..." />;
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image */}
        <div className="lg:w-1/2">
          <div className="bg-gray-100 aspect-square relative rounded-lg mb-4">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="100vw"
              />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="lg:w-1/2 flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          <div className="space-y-1 text-sm text-gray-700">
            {product.brand && (
              <p>
                <span className="font-semibold">Brand:</span>{" "}
                <span className="text-blue-600">{product.brand}</span>
              </p>
            )}
            {product.category && (
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
            )}
            <p>
              <span className="font-semibold">Stock:</span>{" "}
              <span
                className={
                  product.stock > 0
                    ? "text-green-600 font-medium"
                    : "text-red-600"
                }
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          </div>

          <div className="text-3xl text-yellow-600 font-bold">
            ${product.price.toFixed(2)}
          </div>

          {/* Description */}
          {product.description && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold mb-1">Description</h2>
              <p className="text-gray-700 text-sm">{product.description}</p>
            </div>
          )}

          {/* Quantity */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mt-3">
              <label className="text-sm font-medium text-gray-700">Qty</label>
              <div className="flex border rounded-md overflow-hidden">
                <button
                  onClick={() => handleQuantity(-1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  −
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => handleQuantity(1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart */}
          {product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="mt-5 px-6 py-3 bg-yellow-500 text-black rounded-full text-sm font-semibold hover:bg-yellow-300 transition w-full sm:w-auto"
            >
              ADD TO CART
            </button>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(product.rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)} / 5.0 ({product.numReviews} reviews)
            </span>
          </div>
        </div>
      </div>
      ---
      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Customer Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="border-t pt-4 mt-4">
              <p className="text-sm font-semibold text-gray-800">
                {r.userId?.name || "Anonymous"}
              </p>
              <div className="flex text-yellow-500 text-sm">
                {[...Array(5)].map((_, j) => (
                  <FaStar
                    key={j}
                    className={
                      j < r.rating ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{r.comment}</p>
            </div>
          ))
        )}
      </div>
      ---
      {/* Add Review Form */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Comment */}
          <div>
            <label className="block text-sm font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded p-2 w-full"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
