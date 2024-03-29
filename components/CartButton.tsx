"use server";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import ShoppingBag_icon from "./icons/ShoppingBag_icon";

const CartButton = () => {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  return (
    <Link href="/cart" className="relative">
      <ShoppingBag_icon className="w-7 text-white dark:text-white md:text-black" />
      {cart.length > 0 ? (
        <span className="absolute right-0 top-0 block aspect-square h-4 w-4 rounded-full  bg-red-500 text-center text-xs text-white">
          {cart.length}
        </span>
      ) : (
        ""
      )}
    </Link>
  );
};

export default CartButton;
