"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaLeaf } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

 
const heroImages = ["/hero2.png", "/hero3.png", "/hero4.png"];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-base-100 shadow-sm">
      <div className="grid md:grid-cols-2 items-center gap-8 md:gap-0">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-2 md:order-1 px-6 md:px-12 py-10 md:py-0"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d6440a] bg-[#d6440a]/10 px-3 py-1.5 rounded-full mb-5"
          >
            <FaLeaf className="text-[#f4af10]" />
            New Collection
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl leading-[1.05] text-[#2B2420] font-bold"
          >
            Wear Your <br />
            <span className="italic font-heading bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-transparent bg-clip-text">
              Confidence
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-sm text-sm md:text-base text-[#2B2420]/70 leading-relaxed"
          >
            We are dedicated to creating high-quality, handcrafted apparel that
            fits your lifestyle.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-8"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-white text-sm font-medium px-6 py-3.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Shop now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

             
            <div className="flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-gradient-to-r from-[#f4af10] to-[#d6440a]"
                      : "w-1.5 bg-[#2B2420]/20"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-1 md:order-2 relative h-[350px] md:h-[600px] w-full"
        >
          <div className="absolute inset-3 md:inset-6 rounded-2xl overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 1.2, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.8, ease: "easeInOut" },
                }}
                className="absolute inset-0"
              >
                <motion.div
                  animate={{ scale: [1, 1.06] }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={heroImages[current]}
                    alt="Nokshi collection banner"
                    fill
                    priority={current === 0}
                    className="object-cover object-[center_5%]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>

          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="hidden md:flex absolute bottom-10 left-1 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg items-center gap-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#d6440a] animate-pulse" />
            <div>
              <p className="text-xs font-semibold text-[#2B2420]">
                Handcrafted Quality
              </p>
              <p className="text-[10px] text-[#2B2420]/60">Made with love</p>
            </div>
          </motion.div>

 
          <div className="hidden md:block absolute -z-10 top-6 right-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#f4af10]/20 to-[#d6440a]/20 blur-2xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
