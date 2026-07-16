"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

const Hero = () => {
    return (
        <div className="relative w-full rounded-2xl overflow-hidden bg-base-100 shadow-sm">
            <div className="grid md:grid-cols-2 items-center gap-8 md:gap-0">

                {/* Left - Content */}
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
                        We are dedicated to creating high-quality, handcrafted apparel that fits your lifestyle.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <Link
                            href="/products"
                            className="group mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-white text-sm font-medium px-6 py-3.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                        >
                            Shop now
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right - Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="order-1 md:order-2 relative h-[350px] md:h-[600px] w-full"
                >
                    <div className="absolute inset-3 md:inset-6 rounded-2xl overflow-hidden">
                        <Image
                            src="/hero2.png"
                            alt="Nokshi collection banner"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>

                    {/* accent ring */}
                    <div className="hidden md:block absolute -z-10 top-6 right-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#f4af10]/20 to-[#d6440a]/20 blur-2xl" />
                </motion.div>

            </div>
        </div>
    );
};

export default Hero;