"use client";
import { StoreContextType, CartItem } from "@/types";
import { createContext, useEffect, useState } from "react";

const storeContextState = {
  cart: [],
  setCart: () => {},
  favorite: [],
  setFavorite: () => {},
};

export const StoreContext = createContext<StoreContextType>(storeContextState);

export function StoreContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorite, setFavorite] = useState<string[]>([]);
  const newVersion = "1.0.0.5";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedFavorite = localStorage.getItem("favorite");
    const oldVersion = localStorage.getItem("version");

    if (oldVersion !== newVersion) {
      localStorage.clear();
      localStorage.setItem("version", newVersion);
      window.location.reload();
    } else {
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      if (storedFavorite) {
        setFavorite(JSON.parse(storedFavorite));
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("favorite", JSON.stringify(favorite));
    }
  }, [favorite]);

  return (
    <StoreContext.Provider value={{ cart, setCart, favorite, setFavorite }}>
      {children}
    </StoreContext.Provider>
  );
}
