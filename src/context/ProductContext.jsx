"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";

const ProductContext = createContext(null);
const STORAGE_KEY = "nokshi_cart";

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_ITEM": {
      const existing = state.find((i) => i.cartId === action.payload.cartId);
      if (existing) {
        return state.map((i) =>
          i.cartId === action.payload.cartId
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      }
      return [...state, action.payload];
    }

    case "UPDATE_QTY":
      return state.map((i) =>
        i.cartId === action.payload.cartId
          ? { ...i, quantity: action.payload.quantity }
          : i
      );

    case "REMOVE_ITEM":
      return state.filter((i) => i.cartId !== action.payload.cartId);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);

  // Load saved cart once, on mount (client-only, so this never runs on the server).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "SET_CART", payload: JSON.parse(saved) });
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  // Persist on every change, after the initial load completes.
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  const addItem = (product, { color, size, quantity = 1 } = {}) => {
    const cartId = `${product.id}-${color || "default"}-${size || "default"}`;
    dispatch({
      type: "ADD_ITEM",
      payload: {
        cartId,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color,
        size,
        quantity,
      },
    });
  };

  const removeItem = (cartId) => dispatch({ type: "REMOVE_ITEM", payload: { cartId } });

  const updateQty = (cartId, quantity) => {
    if (quantity < 1) {
      removeItem(cartId);
      return;
    }
    dispatch({ type: "UPDATE_QTY", payload: { cartId, quantity } });
  };

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <ProductContext.Provider
      value={{ cart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice, hydrated }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}