import { Poppins } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/NavBar";
import { CartProvider } from "@/context/ProductContext";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Nokshi | Fashion Store",
  description: "Wear the story you want to tell.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body>
        <CartProvider>
          <NavBar />
          {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}