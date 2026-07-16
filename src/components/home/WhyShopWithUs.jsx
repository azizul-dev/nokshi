// src/components/home/WhyShopWithUs.jsx
import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Nationwide shipping, right to your doorstep in days.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Not satisfied? Return within 7 days, hassle-free.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    desc: "Your payments and data are always protected.",
  },
  {
    icon: BadgeCheck,
    title: "Authentic Quality",
    desc: "Every piece is crafted with premium materials.",
  },
];

export default function WhyShopWithUs() {
  return (
    <section className="bg-[#FBF9F5] border-y border-[#EDE7DE]">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-8 md:mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.14em] text-[#8C8478]">
            Why Us
          </p>
          <h2
            className="mt-1 text-2xl md:text-3xl text-[#1C1917]"
            style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
          >
            Why Shop With Us
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[#EDE7DE]"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-r from-[#f4af10] to-[#d6440a] mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-[#1C1917] mb-1">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-[#8C8478] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}