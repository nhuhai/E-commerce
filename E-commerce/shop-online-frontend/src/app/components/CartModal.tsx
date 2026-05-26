"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const CartModal = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleRemove = (id: string) => {
    if (isLoading) return;
    setIsLoading(id);
    setTimeout(() => {
      removeFromCart(id);
      setIsLoading(null);
    }, 300);
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className="w-[90vw] max-w-md absolute p-4 rounded-md shadow-lg bg-white top-14 right-0 flex flex-col gap-6 z-50 border border-gray-100">
      {cartItems.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div className="flex gap-4" key={item.id}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <div className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {item.quantity > 1 && (
                          <span className="text-green-500 text-xs">
                            {item.quantity} ×{" "}
                          </span>
                        )}
                        ${item.price}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">In Stock</p>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                    <button
                      className="text-red-500 hover:underline disabled:opacity-50"
                      onClick={() => handleRemove(item.id)}
                      disabled={isLoading === item.id}
                    >
                      {isLoading === item.id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Bottom */}
          <div>
            <div className="flex justify-between font-semibold text-base">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm gap-2">
              <button
                className="w-full rounded-md py-3 px-4 bg-black text-white hover:bg-gray-900 disabled:opacity-75"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
