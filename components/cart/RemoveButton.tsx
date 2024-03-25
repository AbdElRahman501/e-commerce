"use client";
import { useFormState, useFormStatus } from "react-dom";
import { removeItem } from "../actions/cart.actions";
import { CartItem } from "@/types";
import Image from "next/image";
import LoadingDots from "../loading-dots";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-label="add cart item" aria-disabled={pending}>
      <div className="relative h-5 w-5">
        {pending ? (
          <LoadingDots className="invert dark:invert-0" />
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
  return (
    <form action={removeFormAction} className="absolute right-0 top-0">
      <SubmitButton />
    </form>
  );
};

export default RemoveButton;
