"use client";

import { useFormState, useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { updateItem } from "../actions/cart.actions";
import { CartItem } from "@/types";
import DropDown_icon from "../icons/DropDown_icon";
import { editCart } from "@/utils";

function SubmitButton({
  type,
  disabled,
}: {
  type: "plus" | "minus";
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      disabled={disabled}
      aria-disabled={pending}
      className=" h-full w-full enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25"
    >
      {pending ? (
        <div className=" m-auto mx-2 w-5 text-2xl">
          <LoadingDots />
        </div>
      ) : type === "plus" ? (
        <DropDown_icon className=" m-auto mx-2 w-5 rotate-180" />
      ) : (
        <DropDown_icon className=" m-auto mx-2 w-5" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const [message, formAction] = useFormState(updateItem, null);
  const newItem: CartItem = {
    ...item,
    amount: type === "plus" ? item.amount + 1 : item.amount - 1,
  };
  const actionWithVariant = formAction.bind(null, {
    oldItem: item,
    newItem: newItem,
  });

  const editItemFunction = () => {
    if (typeof window == "undefined") return;
    const cartData = localStorage.getItem("cartItems");
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
    localStorage.setItem(
      "cartItems",
      JSON.stringify(editCart(cart, item, newItem)),
    );
    actionWithVariant();
  };

  return (
    <form action={editItemFunction} className="h-full w-1/3">
      <SubmitButton
        type={type}
        disabled={type === "minus" && item.amount === 1}
      />
    </form>
  );
}
