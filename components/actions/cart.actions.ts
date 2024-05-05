"use server";
import { CartItem } from "@/types";
import { addToCart, editCart, removeFromCart } from "@/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(cartItem: CartItem) {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  cookies().set("cart", JSON.stringify(addToCart(cart, cartItem)));
  revalidateTag("cart");
  return "added to cart";
}

export async function addItems(data: CartItem[]) {
  if (data) {
    cookies().set("cart", JSON.stringify(data));
    revalidateTag("cart");
    return "added to cart";
  }
}

export async function updateItem(
  previous: any,
  { oldItem, newItem }: { oldItem: CartItem; newItem: CartItem },
) {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  cookies().set("cart", JSON.stringify(editCart(cart, oldItem, newItem)));
  revalidateTag("cart");
  return "added to cart";
}

export async function removeItem(previous: any, item: CartItem) {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  cookies().set("cart", JSON.stringify(removeFromCart(cart, item)));
  revalidateTag("cart");
  return "removed from cart";
}
