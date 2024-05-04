"use client";
import { updateItem } from "../actions/cart.actions";
import { CartItem } from "@/types";
import DropDown_icon from "../icons/DropDown_icon";
import { editCart } from "@/utils";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const newItem: CartItem = {
    ...item,
    amount: type === "plus" ? item.amount + 1 : item.amount - 1,
  };

  const editItemFunction = () => {
    if (typeof window == "undefined") return;
    const cartData = localStorage.getItem("cartItems");
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
    localStorage.setItem(
      "cartItems",
      JSON.stringify(editCart(cart, item, newItem)),
    );
  };

  return (
    <button
      type="button"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      onClick={async () => {
        await updateItem(item, newItem);
        editItemFunction();
      }}
      disabled={type === "minus" && item.amount === 1}
      className=" h-full w-full enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25"
    >
      <DropDown_icon
        className={`m-auto mx-2 w-5 ${type === "plus" ? "rotate-180" : ""}`}
      />
    </button>
  );
}
