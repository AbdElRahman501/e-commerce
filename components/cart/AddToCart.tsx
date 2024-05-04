"use client";
import { CartItem } from "@/types";
import Link from "next/link";
import CheckMark from "../icons/CheckMark";
import { addItem } from "../actions/cart.actions";
import ShoppingBag_icon from "../icons/ShoppingBag_icon";
import { addToCart, checkIsInCart } from "@/utils";

const AddToCart = ({
  cart,
  cartItem,
}: {
  cart: CartItem[];
  cartItem: CartItem;
}) => {
  const { selectedColor, selectedSize, amount, productId } = cartItem;
  const addItemToLocalStorage = () => {
    if (typeof window == "undefined") return;
    const cartData = localStorage.getItem("cartItems");
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
    localStorage.setItem(
      "cartItems",
      JSON.stringify(addToCart(cart, cartItem)),
    );
  };
  const isInCart = checkIsInCart(cart, cartItem);

  return isInCart ? (
    <Link
      href="/cart"
      aria-label="go to cart"
      className=" flex h-14 w-full items-center gap-3 rounded-full bg-primary_color p-1  text-white duration-300 enabled:hover:bg-gray-900 disabled:opacity-70 "
    >
      <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-white text-3xl text-black ">
        <CheckMark className="w-10 fill-green-500" />
      </div>
      <p className="w-full text-center uppercase duration-500 md:text-lg">
        Go See In Cart
      </p>
    </Link>
  ) : (
    <button
      type="button"
      aria-label="add cart item"
      disabled={!selectedSize || !selectedColor || !amount}
      onClick={async () => {
        await addItem(cartItem);
        addItemToLocalStorage();
        new Audio("/sounds/short-success.mp3").play();
      }}
      className=" flex h-14 w-full items-center gap-3 rounded-full bg-primary_color p-1  text-white duration-300 enabled:hover:bg-gray-900 disabled:opacity-70 "
    >
      <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-white text-3xl text-black ">
        <ShoppingBag_icon className="w-8" />
      </div>
      <p className="w-full text-center uppercase duration-500 md:text-lg">
        Add to cart
      </p>
    </button>
  );
};

export default AddToCart;
