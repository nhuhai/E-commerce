"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  rating: number;
  numReviews: number;
};

const ProductList = () => {
  const { addToCart } = useCart();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  // Fetch products (initial or paginated)
  const fetchProducts = async (initial = false) => {
    try {
      if (initial) {
        setLoading(true);
        setSkip(0);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get<Product[]>(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/products`,
        {
          params: {
            skip: initial ? 0 : skip,
            limit,
          },
        },
      );

      const newProducts = response.data;

      if (initial) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const uniqueNewProducts = newProducts.filter(
            (p) => !existingIds.has(p._id),
          );
          return [...prev, ...uniqueNewProducts];
        });
      }

      setSkip((prev) => (initial ? limit : prev + limit));
      setHasMore(newProducts.length === limit);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        hasMore &&
        !loadingMore
      ) {
        fetchProducts(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingMore]);

  if (loading) {
    return <Loader text="Loading products..." />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col h-full cursor-pointer">
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
                  {product.description}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const user = localStorage.getItem("token"); // Adjust if using auth tokens

                    if (!user) {
                      router.push("/login");
                      return;
                    }

                    addToCart(
                      {
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image || "",
                        quantity: 1,
                      },
                      1,
                    );
                  }}
                  className="mt-auto text-sm px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Loading More Spinner */}
      {loadingMore && (
        <div className="text-center mt-6 text-gray-600">Loading more...</div>
      )}

      {/* No More Products Message */}
      {!hasMore && (
        <div className="text-center mt-6 text-gray-500">
          No more products to load.
        </div>
      )}
    </div>
  );
};
export default ProductList;
