"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";

const ProductContext = createContext(null);
const CART_STORAGE_KEY = "nokshi_cart";
const WISHLIST_STORAGE_KEY = "nokshi_wishlist";

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

function wishlistReducer(state, action) {
  switch (action.type) {
    case "SET_WISHLIST":
      return action.payload;

    case "TOGGLE_WISHLIST": {
      const exists = state.find((i) => i.id === action.payload.id);
      if (exists) {
        return state.filter((i) => i.id !== action.payload.id);
      }
      return [...state, action.payload];
    }

    case "REMOVE_FROM_WISHLIST":
      return state.filter((i) => i.id !== action.payload.id);

    case "CLEAR_WISHLIST":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, []);
  const [hydrated, setHydrated] = useState(false);

  // Load saved cart + wishlist once, on mount (client-only, so this never runs on the server).
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) dispatch({ type: "SET_CART", payload: JSON.parse(savedCart) });
    } catch {
      // ignore corrupted storage
    }
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) wishlistDispatch({ type: "SET_WISHLIST", payload: JSON.parse(savedWishlist) });
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  // Persist cart on every change, after the initial load completes.
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  // Persist wishlist on every change, after the initial load completes.
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, hydrated]);

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

  const toggleWishlist = (product) => {
    wishlistDispatch({
      type: "TOGGLE_WISHLIST",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        inStock: product.inStock,
      },
    });
  };

  const removeFromWishlist = (id) =>
    wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id } });

  const clearWishlist = () => wishlistDispatch({ type: "CLEAR_WISHLIST" });

  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);
  const wishlistCount = wishlist.length;

  return (
    <ProductContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        hydrated,
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount,
      }}
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