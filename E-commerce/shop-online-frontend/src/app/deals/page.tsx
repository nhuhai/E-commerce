"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Product = {
  _id: string;
  name: string;
  price: number | string; // originalPrice
  dealPrice: number | string;
  image: string;
  stock: number;
};

export default function DealsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/products/deals`,
        );
        setProducts(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load deals");
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error("Out of stock");
      return;
    }
    const dealPriceNum = Number(product.dealPrice) || 0;
    addToCart({
      id: product._id,
      name: product.name,
      price: dealPriceNum,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  if (loading) return <div className="text-center py-20">Loading deals...</div>;

  if (products.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">No deals right now.</div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600">🔥 Hot Deals</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const priceNum = Number(product.price) || 0;
          const dealPriceNum = Number(product.dealPrice) || 0;

          const discountPercent =
            priceNum > 0
              ? Math.round(((priceNum - dealPriceNum) / priceNum) * 100)
              : 0;

          return (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition"
            >
              <div className="relative w-full h-60 bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{discountPercent}%
                </span>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-gray-900">{product.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-500">
                    ${dealPriceNum.toFixed(2)}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    ${priceNum.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 px-4 py-2 bg-yellow-500 rounded-full text-sm font-semibold hover:bg-yellow-400 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
