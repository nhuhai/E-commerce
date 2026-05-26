"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Up to 50% Off",
    img: "/test1.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-100 to-pink-100",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Cozy Deals Await",
    img: "/test2.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-pink-100 to-blue-100",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Fresh Styles, Hot Discounts",
    img: "/test3.jpg",
    url: "/",
    bg: "bg-gradient-to-r from-blue-100 to-yellow-100",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="h-[calc(100vh-80px)] relative overflow-hidden">
      <div
        className="w-max h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col-reverse xl:flex-row items-center justify-center px-6 xl:px-20 gap-10`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="text-center xl:text-left xl:w-1/2 space-y-6">
              <h2 className="text-lg xl:text-2xl text-gray-700 tracking-wider uppercase">
                {slide.description}
              </h2>
              <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-extrabold text-gray-900 leading-tight">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="mt-4 inline-block rounded-full bg-black text-white py-3 px-6 text-sm xl:text-base hover:bg-gray-800 transition duration-300">
                  Shop Now
                </button>
              </Link>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="relative w-full h-1/2 xl:h-full xl:w-1/2">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                sizes="100%"
                className="object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* NAV DOTS */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full border border-gray-500 transition-all duration-300 ${
              current === index ? "bg-gray-800 scale-110" : "bg-white"
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default Slider;
