"use server";
import { CartItem } from "@/types";
import Link from "next/link";
import React from "react";
import ShoppingBag_icon from "./icons/ShoppingBag_icon";

const CartButton = ({ cart }: { cart: CartItem[] }) => {
  return (
    <Link href="/cart" aria-label="cart link" className="relative p-2">
      <ShoppingBag_icon className="h-8 w-8 text-white duration-200 hover:scale-110 dark:text-white md:text-black" />
      {cart.length > 0 ? (
        <span className="absolute right-2 top-2 block aspect-square h-4 w-4 rounded-full  bg-red-500 text-center text-xs text-white">
          {cart.length}
        </span>
      ) : (
        ""
      )}
    </Link>
  );
};

export default CartButton;
