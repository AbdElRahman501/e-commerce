"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const CartButton = () => {
  const { cart } = useContext(CartContext);
  return (
    <Link href="/cart" className="relative">
      <Image
        className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
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
