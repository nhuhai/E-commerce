"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Head>
        <title>Our Story | YourStore</title>
        <meta
          name="description"
          content="Discover YourStore's mission, values, and our commitment to bringing you high-quality fashion, beauty, and accessories."
        />
      </Head>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-gray-900">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-pink-100 to-white rounded-3xl p-10 md:p-20 text-center mb-20 shadow-xl"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Our Story, Your Style
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            At YourStore, shopping is more than a purchase — it's a celebration of individuality. We curate collections that inspire confidence and reflect your unique vibe.
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-4 leading-relaxed text-gray-700">
              YourStore was launched in 2025 with a simple mission: make premium fashion and beauty accessible to everyone. We select each item for its style, sustainability, and spirit.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Our team is passionate about creating a seamless, inspiring, and ethical shopping experience — from click to delivery.
            </p>
          </motion.div>

          <motion.div
            className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/about.png"
              alt="Curated fashion"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default About;
