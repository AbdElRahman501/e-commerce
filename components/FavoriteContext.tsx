"use client";
import { FavoriteContextType } from "@/types";
import { createContext, useState } from "react";

const cartContextState = {
  favorite: [],
  setFavorite: () => {},
};

export const CartContext = createContext<FavoriteContextType>(cartContextState);

export function FavoriteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorite, setFavorite] = useState<string[]>([]);
  return (
    <CartContext.Provider value={{ favorite, setFavorite }}>
      {children}
    </CartContext.Provider>
  );
}
