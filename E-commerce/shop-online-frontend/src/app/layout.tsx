import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext"; // 👈 Add this
import { CartProvider } from "./context/CartContext"; // adjust path if needed


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
          <ToastContainer position="top-right" autoClose={3000} />
          {children} 
      </body>
    </html>
  );
}
