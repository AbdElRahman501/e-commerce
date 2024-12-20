"use client";
import { CartItem } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "../actions/cart.actions";
import { addToCart, checkIsInCart } from "@/utils";
import LoadingDots from "../loading-dots";
import ShoppingBag_icon from "../icons/ShoppingBag_icon";
import Link from "next/link";
import CheckMark from "../icons/CheckMark";

export function SubmitButton({
  isInCart,
  disabled,
  customContent,
}: {
  isInCart: boolean;
  disabled: boolean;
  customContent?: string;
}) {
  const { pending } = useFormStatus();

  return customContent ? (
    <button
      type="submit"
      aria-label="add cart item"
      disabled={disabled || pending}
      aria-disabled={pending}
      className=" flex h-14 w-full items-center gap-3 rounded-full bg-primary_color p-1  text-white duration-300 enabled:hover:bg-gray-900 disabled:opacity-70 "
    >
      <div className="flex aspect-square h-12 items-center justify-center rounded-full bg-white text-3xl text-black ">
        {pending ? <LoadingDots /> : <ShoppingBag_icon className="w-8" />}
      </div>

      <p className="w-full text-center text-lg uppercase duration-500">
        {customContent}
      </p>
    </button>
  ) : isInCart ? (
    <Link
      href="/cart"
      className=" flex h-14 w-full items-center gap-3 rounded-full bg-primary_color p-1  text-white duration-300 enabled:hover:bg-gray-900 disabled:opacity-70 "
    >
      <div className="flex aspect-square h-12 items-center justify-center rounded-full bg-white text-3xl text-black ">
        <CheckMark className="h-8 w-8 fill-green-500" />
      </div>
      <p className="w-full text-center text-lg uppercase duration-500">
        Go See In Cart
      </p>
    </Link>
  ) : (
    <button
      type="submit"
      aria-label="add cart item"
      disabled={disabled || pending}
      aria-disabled={pending}
      className=" flex h-14 w-full items-center gap-3 rounded-full bg-primary_color p-1  text-white duration-300 enabled:hover:bg-gray-900 disabled:opacity-70 "
    >
      <div className="flex aspect-square h-12 items-center justify-center rounded-full bg-white text-3xl text-black ">
        {pending ? <LoadingDots /> : <ShoppingBag_icon className="w-8" />}
      </div>

      <p className="w-full text-center text-lg uppercase duration-500">
        Add to cart
      </p>
    </button>
  );
}

const AddToCart = ({
  cart,
  cartItem,
  disabled,
  customContent,
}: {
  disabled: boolean;
  cart: CartItem[];
  cartItem: CartItem;
  customContent?: string;
}) => {
  const [message, formAction] = useFormState(addItem, null);
  const actionWithVariant = formAction.bind(null, cartItem);

  const addItemAction = () => {
    if (typeof window == "undefined") return;
    const cartData = localStorage.getItem("cartItems");
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
    localStorage.setItem(
      "cartItems",
      JSON.stringify(addToCart(cart, cartItem)),
    );
    new Audio("/sounds/short-success.mp3").play();
    actionWithVariant();
  };

  return (
    <form action={addItemAction} className="w-full">
      <SubmitButton
        isInCart={checkIsInCart(cart, cartItem)}
        customContent={customContent}
        disabled={disabled || cartItem.amount < 1}
      />
    </form>
  );
};

export default AddToCart;
