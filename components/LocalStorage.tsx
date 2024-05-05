"use client";
import React from "react";
import { addItems } from "./actions/cart.actions";
import { CartItem } from "@/types";
import { addFav } from "./actions/fav.actions";

const LocalStorage = () => {
  React.useEffect(() => {
    const cart =
      typeof window !== "undefined" && localStorage.getItem("cartItems");
    const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];
    const favorite =
      typeof window !== "undefined" && localStorage.getItem("favoriteItems");
    const favoriteItems: string[] = favorite ? JSON.parse(favorite) : [];
    const updateLocalStorage = async () => {
      await addItems(cartItems);
      await addFav(favoriteItems);
    };
    updateLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LocalStorage;
