"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartModal from "./CartModal";
import { useCart } from "../context/CartContext"; // ✅ import cart context

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false); // Replace with real auth logic
  const router = useRouter();

  const { cartItems } = useCart(); // ✅ get cart items from context

  const handleProfile = () => {
    if (!isLogedIn) {
      router.push("/login");
    }
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="relative flex items-center gap-4 xl:gap-6">
      {/* Profile Icon */}
      <div className="relative">
        <Image
          src="/profile.png"
          alt="Profile"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleProfile}
        />
        {isProfileOpen && (
          <div className="absolute top-6 z-50 bg-white shadow-lg p-4 rounded-md text-sm text-black w-32">
            <Link href="/" className="block hover:underline">
              Profile
            </Link>
            <div className="mt-2 cursor-pointer hover:underline">Logout</div>
          </div>
        )}
      </div>

      {/* Notification Icon */}
      <Image
        src="/notification.png"
        alt="Notification"
        width={22}
        height={22}
        className="cursor-pointer"
      />

      {/* Cart Icon */}
      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt="Cart"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        {cartItems.length > 0 && (
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#eb1a48] text-white text-sm font-medium flex items-center justify-center rounded-full">
            {cartItems.length}
          </div>
        )}
        {isCartOpen && (
          <div className="absolute right-0 top-10 z-50">
            <CartModal />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavIcons;
