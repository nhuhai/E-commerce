"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/user/signup`,
        { name, email, password },
      );

      const { status, data } = response;

      if (status === 201) {
        toast.success("Signup successful!");
        router.push("/login");
        console.log(data.message); // "User registered successfully"
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
        toast.error("Signup failed");
      }
    }
  };

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left Side: Branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-green-50 p-8">
          <motion.img
            src="/shopping-cart.svg"
            alt="E-commerce Illustration"
            className="w-48 h-48 mb-6"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
          <h2 className="text-3xl font-bold text-blue-600">Join ShopOnline</h2>
          <p className="mt-2 text-lg text-gray-600 text-center">
            Sign up now and start shopping your favorites!
          </p>
        </div>

        {/* Right Side: Signup Form */}
        <div className="p-8 md:p-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Join the ShopOnline family today.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="username"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>

          {error && (
            <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
