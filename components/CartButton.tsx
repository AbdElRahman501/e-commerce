"use server";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartButton = () => {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  return (
    <Link href="/cart" className="relative">
      <Image
        className="w-auto invert duration-300 hover:scale-110 dark:invert md:invert-0"
        src={"/icons/cart.svg"}
        alt="heart"
        width={30}
        height={30}
      />

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
