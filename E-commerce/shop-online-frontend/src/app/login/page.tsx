"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext"; // adjust path if needed

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/user/login`,
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // ✅ Save token and update login state
      localStorage.setItem("token", token);
      setIsLoggedIn(true);

      // ✅ Redirect to homepage
      router.push("/");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Login failed");
    }
  };

  if (isLoggedIn) return null; // Avoid showing login form when redirecting

  return (
    <>
      <Head>
        <title>Login | ShopOnline</title>
      </Head>

      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 70 }}
        className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Left Section */}
          <div className="hidden md:flex flex-col justify-center items-center bg-blue-50 p-8">
            <motion.img
              src="/shopping-cart.svg"
              alt="E-commerce Illustration"
              className="w-48 h-48 mb-6"
              animate={{ y: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
            <h2 className="text-3xl font-bold text-blue-600">ShopOnline</h2>
            <p className="mt-2 text-lg text-gray-600 text-center">
              Your favorite online store for everything you love.
            </p>
          </div>

          {/* Right Section: Login Form */}
          <div className="p-8 md:p-12">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="mt-1 text-sm text-gray-500">
                Login to continue shopping with ShopOnline
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Login
              </motion.button>
            </form>

            {error && (
              <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
            )}

            <p className="mt-6 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
