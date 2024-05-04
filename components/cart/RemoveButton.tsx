"use client";
import { removeItem } from "../actions/cart.actions";
import { CartItem } from "@/types";
import Image from "next/image";
import { removeFromCart } from "@/utils";

const RemoveButton = ({ cartItem }: { cartItem: CartItem }) => {
  const removeItemAction = () => {
    if (typeof window == "undefined") return;
    const cartData = localStorage.getItem("cartItems");
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
    localStorage.setItem(
      "cartItems",
      JSON.stringify(removeFromCart(cart, cartItem)),
    );
  };

  return (
    <button
      type="button"
      onClick={async () => {
        await removeItem(cartItem);
        removeItemAction();
      }}
      aria-label="remove cart item"
    >
      <div className="relative h-5 w-5 text-3xl ">
        <Image
          src="/icons/remove.svg"
          alt="remove"
          fill
          sizes="100%"
          className="cursor-pointer duration-300 hover:scale-110"
        />
      </div>
    </button>
  );
};

export default RemoveButton;
