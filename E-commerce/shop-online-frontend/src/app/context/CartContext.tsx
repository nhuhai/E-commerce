"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartCount: 0,
});

export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem, quantity: number = 1) => {
    const uniqueId = newItem.id;
    const existing = cartItems.find((item) => item.id === uniqueId);

    if (existing) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === uniqueId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
      toast.info(`Updated quantity for ${newItem.name}`);
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...newItem, id: uniqueId, quantity },
      ]);
      toast.success(`Added ${newItem.name} to cart`);
    }
  };

  const removeFromCart = (id: string) => {
    const removedItem = cartItems.find((item) => item.id === id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (removedItem) toast.error(`Removed ${removedItem.name} from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.warn("Cart cleared");
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
