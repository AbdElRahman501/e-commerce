"use client";
import { CartItem } from "@/types";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "../actions/cart.actions";
import Image from "next/image";
import { checkIsInCart } from "@/utils";
import { useRouter } from "next/navigation";
import LoadingDots from "../loading-dots";

export function SubmitButton({
  isInCart,
  disabled,
}: {
  isInCart: boolean;
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="add cart item"
      disabled={disabled}
      aria-disabled={pending}
      className=" flex h-12 w-full items-center gap-3 rounded-full bg-primary_color p-1 text-white duration-300 enabled:hover:bg-gray-900 disabled:opacity-70 "
    >
      <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-white ">
        {pending ? (
          <LoadingDots className="invert" />
        ) : (
          <Image
            src={isInCart ? "/icons/check.svg" : "/icons/cart.svg"}
            alt="cart icon"
            width={24}
            height={24}
            className="w-auto duration-300 "
          />
        )}
      </div>

      <p className="w-full text-center text-lg duration-500">
        {isInCart ? "In my cart" : "Add to cart"}
      </p>
    </button>
  );
}

const AddToCart = ({
  cart,
  cartItem,
}: {
  cart: CartItem[];
  cartItem: CartItem;
}) => {
  const router = useRouter();
  const { selectedColor, selectedSize, amount } = cartItem;
  const [message, formAction] = useFormState(addItem, null);
  const actionWithVariant = formAction.bind(null, cartItem);

  useEffect(() => {
    if (message === "added to cart") {
      const audio = new Audio("/sounds/short-success.mp3");
      audio?.play();
    } else if (message === "already in cart") {
      router.push("/cart");
    }
  }, [message, router]);

  return (
    <form action={actionWithVariant} className="w-full">
      <SubmitButton
        isInCart={checkIsInCart(cart, cartItem)}
        disabled={!selectedColor || !selectedSize || amount < 1}
      />
    </form>
  );
};

export default AddToCart;
