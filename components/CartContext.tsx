"use client";
import { CartContextType, CartProduct } from "@/types";
import { createContext, useState } from "react";

const cartContextState = {
  cart: [],
  setCart: () => {},
};

export const CartContext = createContext<CartContextType>(cartContextState);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartProduct[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
