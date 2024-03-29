"use client";
import { CartItem } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "../actions/cart.actions";
import { checkIsInCart } from "@/utils";
import LoadingDots from "../loading-dots";
import ShoppingBag_icon from "../icons/ShoppingBag_icon";

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
      className=" flex h-14 w-full items-center gap-3 rounded-full bg-primary_color p-1  text-white duration-300 enabled:hover:bg-gray-900 disabled:opacity-70 "
    >
      <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-white text-3xl text-black ">
        {pending ? <LoadingDots /> : <ShoppingBag_icon className="w-6" />}
      </div>

      <p className="w-full text-center text-lg uppercase duration-500">
        {isInCart ? "Go See In Cart" : "Add to cart"}
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
  const { selectedColor, selectedSize, amount } = cartItem;
  const [message, formAction] = useFormState(addItem, null);
  const actionWithVariant = formAction.bind(null, cartItem);

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
