"use client";
import { initialOrder } from "@/constants";
import { StoreContextType, CartProduct, Order } from "@/types";
import { createContext, useEffect, useState } from "react";

const storeContextState = {
  cart: [],
  setCart: () => {},
  favorite: [],
  setFavorite: () => {},
  order: initialOrder,
  setOrder: () => {},
};

export const StoreContext = createContext<StoreContextType>(storeContextState);

export function StoreContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [favorite, setFavorite] = useState<string[]>([]);
  const [order, setOrder] = useState<Order>(initialOrder);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedFavorite = localStorage.getItem("favorite");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedFavorite) {
      setFavorite(JSON.parse(storedFavorite));
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
    <StoreContext.Provider
      value={{ cart, setCart, favorite, setFavorite, order, setOrder }}
    >
      {children}
    </StoreContext.Provider>
  );
}
