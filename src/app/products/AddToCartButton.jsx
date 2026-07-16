"use client";

import { useCart } from "@/context/ProductContext";
import { useState } from "react";
import { Minus, Plus, Check, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddToCartButton = ({ product }) => {
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors?.[0] || null);
  const [size, setSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem(product, { color, size, quantity });

    setAdded(true);
    setShowToast(true);

    setTimeout(() => setAdded(false), 1500);
    setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <div className="flex flex-col gap-5">
      {product.colors?.length > 0 && (
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-[#8C8478]">Color</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-all ${
                  color === c
                    ? "border-transparent bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-[#F7F3EC]"
                    : "border-[#E7E1D4] text-[#1C1917] hover:border-[#1C1917]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes?.length > 0 && (
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-[#8C8478]">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-lg border px-3.5 py-1.5 text-sm transition-all ${
                  size === s
                    ? "border-transparent bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-[#F7F3EC]"
                    : "border-[#E7E1D4] text-[#1C1917] hover:border-[#1C1917]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="join border border-[#E7E1D4] rounded-full">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="join-item btn btn-sm btn-ghost rounded-full px-3 hover:bg-[#F0EBDF]"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          
          <span className="join-item flex items-center justify-center w-9 text-sm font-medium text-[#1C1917] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={quantity}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
          </span>

          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="join-item btn btn-sm btn-ghost rounded-full px-3 hover:bg-[#F0EBDF]"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <motion.button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          whileTap={product.inStock ? { scale: 0.94 } : {}}
          animate={added ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="btn border-none flex-1 md:flex-initial md:px-10 rounded-full text-sm font-medium uppercase tracking-wide text-[#F7F3EC] bg-gradient-to-r from-[#f4af10] to-[#d6440a] hover:opacity-90 transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-none disabled:bg-[#8C8478] gap-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!product.inStock ? (
              <motion.span key="out" className="flex items-center gap-2">
                Out of stock
              </motion.span>
            ) : added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Added
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

     
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="toast toast-top toast-end z-50"
          >
            <div className="alert border-none bg-[#1C1917] text-[#F7F3EC] shadow-lg gap-2 rounded-xl">
              <Check className="w-4 h-4 text-[#f4af10]" />
              <span className="text-sm">
                {quantity} × {product.name} added to cart
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddToCartButton;