// src/components/Footer.jsx
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-[#EDE7DE] bg-[#FBF9F5]">
      <div className="container mx-auto px-4 py-10 md:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="p-[2px] rounded-full bg-gradient-to-r from-[#f4af10] to-[#d6440a]">
              <Image
                src="/logo.png"
                alt="Nokshi logo"
                width={32}
                height={32}
                className="object-contain rounded-full block bg-white"
              />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-transparent bg-clip-text">
              Nok<span>Shi</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-[#8C8478] leading-relaxed">
            Modern fashion, crafted for everyday elegance. Explore our
            curated collection made for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-[#1C1917] mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-[#8C8478]">
            <li><Link href="/" className="hover:text-[#d6440a] transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-[#d6440a] transition">Products</Link></li>
            <li><Link href="/cart" className="hover:text-[#d6440a] transition">Cart</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-[#1C1917] mb-3">
            Categories
          </h3>
          <ul className="space-y-2 text-sm text-[#8C8478]">
            <li><Link href="/products?category=Panjabi" className="hover:text-[#d6440a] transition">Panjabi</Link></li>
            <li><Link href="/products?category=Shirt" className="hover:text-[#d6440a] transition">Shirt</Link></li>
            <li><Link href="/products?category=T-Shirt" className="hover:text-[#d6440a] transition">T-Shirt</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-sm font-semibold text-[#1C1917] mb-3">
            Get in Touch
          </h3>
          <p className="text-sm text-[#8C8478]">hello@nokshi.com</p>
          <p className="text-sm text-[#8C8478] mt-1">+880 1XXX-XXXXXX</p>

          <div className="flex items-center gap-3 mt-4">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1C1917] text-white hover:bg-[#d6440a] transition"
            >
              <FaFacebookF size={14} />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1C1917] text-white hover:bg-[#d6440a] transition"
            >
              <FaInstagram size={14} />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1C1917] text-white hover:bg-[#d6440a] transition"
            >
              <FaWhatsapp size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[#EDE7DE] py-4">
        <p className="text-center text-xs text-[#8C8478]">
          © {new Date().getFullYear()} NokShi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;