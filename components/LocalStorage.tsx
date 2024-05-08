"use client";
import React from "react";
import { addItems } from "./actions/cart.actions";
import { CartItem } from "@/types";
import { addFav } from "./actions/fav.actions";

const LocalStorage = () => {
  const cart =
    typeof window !== "undefined" && localStorage.getItem("cartItems");
  const cartItems: CartItem[] = cart ? JSON.parse(cart) : [];
  const favorite =
    typeof window !== "undefined" && localStorage.getItem("favoriteItems");
  const favoriteItems: string[] = favorite ? JSON.parse(favorite) : [];

  const addCartItemsToCookies = addItems.bind(null, cartItems);
  const addFavoriteItemsToCookies = addFav.bind(null, favoriteItems);
  React.useEffect(() => {
    addCartItemsToCookies(cartItems);
    addFavoriteItemsToCookies(favoriteItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LocalStorage;
