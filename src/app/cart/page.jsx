"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/ProductContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cart, removeItem, updateQty, totalPrice, hydrated } = useCart();

  if (!hydrated) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-dots loading-md text-[#d6440a]"></span>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-28 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-[#F7F3EC] flex items-center justify-center border border-[#E7E1D4]">
          <ShoppingBag className="w-9 h-9 text-[#d6440a]" strokeWidth={1.5} />
        </div>
        <h2
          className="text-2xl text-[#1C1917]"
          style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
        >
          Your cart is empty
        </h2>
        <p className="max-w-xs text-sm text-[#8C8478]">
          Looks like you haven&apos;t added anything yet. Explore the collection and
          find something you like.
        </p>
        <Link
          href="/products"
          className="btn border-none mt-2 rounded-full px-8 text-[#F7F3EC] bg-gradient-to-r from-[#f4af10] to-[#d6440a] hover:opacity-90"
        >
          Browse products
        </Link>
      </motion.section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
      <div className="mb-8 flex items-baseline justify-between">
        <h1
          className="text-3xl md:text-4xl text-[#1C1917]"
          style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
        >
          Your Cart
        </h1>
        <span className="badge badge-lg border-none bg-[#F7F3EC] text-[#8C8478]">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} items
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence initial={false} mode="popLayout">
          {cart.map((item) => (
            <motion.div
              key={item.cartId}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="card card-side bg-[#FBF9F4] border border-[#E7E1D4] rounded-2xl shadow-sm hover:shadow-md transition-shadow p-3 md:p-4"
            >
              <figure className="relative h-28 w-24 md:h-32 md:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-[#EFE9DC]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </figure>

              <div className="card-body p-0 pl-4 md:pl-5 flex flex-row justify-between">
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-base font-medium text-[#1C1917]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#8C8478] mt-1">
                      {[item.color, item.size].filter(Boolean).join(" / ")}
                    </p>
                  </div>

                  <div className="join border border-[#E7E1D4] rounded-full w-fit mt-3 md:mt-0">
                    <button
                      type="button"
                      onClick={() => updateQty(item.cartId, item.quantity - 1)}
                      className="join-item btn btn-xs btn-ghost rounded-full px-2 hover:bg-[#F0EBDF]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="join-item flex items-center justify-center w-8 text-sm font-medium text-[#1C1917] overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={item.quantity}
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {item.quantity}
                        </motion.span>
                      </AnimatePresence>
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQty(item.cartId, item.quantity + 1)}
                      className="join-item btn btn-xs btn-ghost rounded-full px-2 hover:bg-[#F0EBDF]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between py-1">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => removeItem(item.cartId)}
                    className="btn btn-ghost btn-xs btn-circle text-[#8C8478] hover:text-[#7A2530] hover:bg-transparent"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                  <span className="text-base font-semibold text-[#1C1917] whitespace-nowrap">
                    ৳{(item.price * item.quantity).toLocaleString("en-BD")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="divider before:bg-[#E7E1D4] after:bg-[#E7E1D4] my-8"></div>

      <motion.div
        layout
        className="flex flex-col gap-6 bg-[#FBF9F4] border border-[#E7E1D4] rounded-2xl p-5 md:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#8C8478]">Subtotal</span>
          <span className="text-sm text-[#1C1917]">
            ৳{totalPrice.toLocaleString("en-BD")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#8C8478]">Shipping</span>
          <span className="text-sm text-[#8C8478]">Calculated at checkout</span>
        </div>
        <div className="divider before:bg-[#E7E1D4] after:bg-[#E7E1D4] my-0"></div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-[#1C1917]">Total</span>
          <span
            className="text-2xl text-[#1C1917]"
            style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
          >
            ৳{totalPrice.toLocaleString("en-BD")}
          </span>
        </div>

        <button
          type="button"
          className="btn border-none w-full rounded-full text-[#F7F3EC] bg-gradient-to-r from-[#f4af10] to-[#d6440a] hover:opacity-90 gap-2 mt-2"
        >
          Checkout
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  );
}