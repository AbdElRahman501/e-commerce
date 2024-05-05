"use client";
import { useFormState, useFormStatus } from "react-dom";
import { removeItem } from "../actions/cart.actions";
import { CartItem } from "@/types";
import Image from "next/image";
import LoadingDots from "../loading-dots";
import { removeFromCart } from "@/utils";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-label="add cart item" aria-disabled={pending}>
      <div className="relative h-5 w-5 text-3xl ">
        {pending ? (
          <LoadingDots />
        ) : (
          <Image
            src="/icons/remove.svg"
            alt="remove"
            fill
            sizes="100%"
            className="cursor-pointer duration-300 hover:scale-110"
          />
        )}
      </div>
    </button>
  );
};
const RemoveButton = ({ cartItem }: { cartItem: CartItem }) => {
  const [message, formAction] = useFormState(removeItem, null);
  const removeFormAction = formAction.bind(null, cartItem);

  const removeItemAction = () => {
    if (typeof window == "undefined") return;
    const cartData = localStorage.getItem("cartItems");
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
    localStorage.setItem(
      "cartItems",
      JSON.stringify(removeFromCart(cart, cartItem)),
    );
    removeFormAction();
  };

  return (
    <form action={removeItemAction} className="flex items-center">
      <SubmitButton />
    </form>
  );
};

export default RemoveButton;
