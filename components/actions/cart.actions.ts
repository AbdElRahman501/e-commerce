"use server";
import { CartItem } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  previousState: any,
  { selectedColor, selectedSize, amount, productId }: CartItem,
) {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  let isInCart;

  if (cart) {
    isInCart = cart.some(
      (item) =>
        item.productId === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize,
    );
  }

  if (!isInCart) {
    const data = [
      ...cart,
      {
        productId,
        amount,
        selectedColor,
        selectedSize,
      },
    ];
    cookies().set("cart", JSON.stringify(data));
    revalidateTag("cart");
    return "added to cart";
  } else {
    redirect("/cart");
    return "already in cart";
  }
}
export async function updateItem(
  previousState: any,
  {
    oldItem,
    newItem,
  }: {
    oldItem: CartItem;
    newItem: CartItem;
  },
) {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

  const data = cart.map((item) => {
    if (
      item.productId === oldItem.productId &&
      item.selectedColor === oldItem.selectedColor &&
      item.selectedSize === oldItem.selectedSize
    ) {
      return newItem;
    }
    return item;
  });
  cookies().set("cart", JSON.stringify(data));
  revalidateTag("cart");
  return "added to cart";
}

export async function removeItem(
  previousState: any,
  { selectedColor, selectedSize, productId }: CartItem,
) {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

  const data = cart.filter((item) => {
    const matchItem =
      item.productId === productId &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize;

    if (matchItem) {
      return false;
    }
    return true;
  });

  cookies().set("cart", JSON.stringify(data));
  revalidateTag("cart");
  return "removed from cart";
}
