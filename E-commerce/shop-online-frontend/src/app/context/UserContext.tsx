"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

export const UserContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set login state if token exists
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
