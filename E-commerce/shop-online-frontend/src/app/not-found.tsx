// app/not-found.tsx
"use client";

import Link from "next/link";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa"; // Added FaExclamationTriangle
import { motion } from "framer-motion"; // For subtle animations

export default function NotFound() {
  return (
    // Enhanced background: subtle gradient for a softer, more modern feel
    // Increased vertical padding
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-center px-6 py-20">

      {/* Optional: Large, expressive icon for visual impact */}
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8 text-blue-500"
      >
        <FaExclamationTriangle className="w-24 h-24 sm:w-32 sm:h-32" />
      </motion.div>

      {/* "404" - Larger, bolder, more distinct color */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-7xl sm:text-8xl font-extrabold text-blue-600 drop-shadow-lg mb-4"
      >
        404
      </motion.h1>

      {/* "Page Not Found" - Clearer, slightly larger */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4"
      >
        Page Not Found
      </motion.h2>

      {/* Description - More engaging tone */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-lg text-gray-700 max-w-md mx-auto leading-relaxed mb-8"
      >
        Oops! It looks like the page you were trying to reach has taken a detour or doesn't exist.
        Don't worry, you can find your way back.
      </motion.p>

      {/* Back to Home Button - Primary color, more prominent, subtle animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium
                     hover:bg-blue-700 transition-colors duration-300 ease-in-out
                     shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          <FaArrowLeft className="text-xl" /> {/* Larger icon */}
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}