"use client";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* MOBILE NAVIGATION */}
        <div className="md:hidden lg:hidden 2xl:hidden h-full flex items-center justify-between">
          <Link href={"/"}>
            <div className="text-2xl tracking-wide">Shop Online</div>
          </Link>
          <Menu />
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden h-full md:flex justify-between items-center gap-8">
          {/* LEFT SECTION */}
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <Link href={"/"} className="flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={24} height={24} />
              <div className="text-2xl tracking-wide">Shop Online</div>
            </Link>

            <div className="hidden xl:flex gap-4">
              <Link href="/">Homepage</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              {isLoggedIn && (
                <>
                  <Link href="/deals">Deals</Link>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          {isLoggedIn ? (
            <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
              <SearchBar />
              <NavIcons />
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="w-2/3 xl:w-1/2 flex justify-end">
              <Link href="/login" className="text-sm hover:underline">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
