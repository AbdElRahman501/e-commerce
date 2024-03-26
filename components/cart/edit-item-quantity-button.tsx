"use client";

import { useFormState, useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { updateItem } from "../actions/cart.actions";
import { CartItem } from "@/types";

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
      className="w-6 flex-1 text-2xl enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25"
    >
      {pending ? (
        <LoadingDots className="invert dark:invert-0" />
      ) : type === "plus" ? (
        <span>&#43;</span>
      ) : (
        <span>&#8722;</span>
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

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        type={type}
        disabled={type === "minus" && item.amount === 1}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
