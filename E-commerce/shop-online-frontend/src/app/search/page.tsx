"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

const SearchPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const searchName = searchParams.get("name") || "";
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/products/search?name=${searchName}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [searchName]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(
      {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image || "",
        quantity: 1,
      },
      1
    );
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Search Results for: <span className="text-blue-600">{searchName}</span>
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            // The outer div is now the main container
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* This Link wraps the content of the card *except* the button */}
              <Link href={`/product/${product._id}`} className="p-4 flex flex-col flex-grow cursor-pointer">
                {/* Product Image */}
                <div className="w-full aspect-square relative mb-4 bg-gray-50 rounded-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`Image of ${product.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    priority={true}
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-md font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-md font-semibold text-gray-800">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description || "No description available"}
                  </p>
                </div>
              </Link>

              {/* The button is now a separate, clickable element */}
              <div className="p-4 pt-0">
              <button
                    onClick={(e) => {
                      // Stop the click from propagating to the parent Link
                      e.stopPropagation();
                      // Prevent the default Link behavior
                      e.preventDefault();

                      addToCart(
                        {
                          id: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.image || "",
                          quantity: 1,
                        },
                        1
                      );
                    }}
                    className="w-full mt-auto bg-gray-400 text-white font-medium uppercase text-sm py-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition"
                    aria-label={`Add to cart`}                  >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;