// components/Loader.tsx
"use client";

import React from "react";

type LoaderProps = {
  text?: string;
};

const Loader: React.FC<LoaderProps> = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinner */}
      <svg
        className="animate-spin h-8 w-8 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>

      {/* Text */}
      <p className="mt-4 text-gray-600 text-lg animate-pulse">{text}</p>
    </div>
  );
};

export default Loader;
