"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Logo and About */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-800">Shop Online</h2>
            <p className="text-gray-600 leading-relaxed">
              Your go-to shop for modern lifestyle essentials, clothing, and gadgets curated with care.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-md font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-black">All Products</Link></li>
              <li><Link href="/categories/men" className="hover:text-black">Men</Link></li>
              <li><Link href="/categories/women" className="hover:text-black">Women</Link></li>
              <li><Link href="/categories/accessories" className="hover:text-black">Accessories</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-md font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-black">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-black">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-black">FAQ</Link></li>
              <li><Link href="/returns" className="hover:text-black">Returns</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-md font-semibold mb-4">Stay Connected</h3>
            <form className="flex items-center gap-2 mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button type="submit" className="bg-black text-white px-4 py-2 text-sm rounded-md">
                Subscribe
              </button>
            </form>
            <div className="flex gap-4 text-lg text-gray-600">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Shop Online. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
