"use server";
import { CartItem } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

// const updateProductColor = (newColor: string) => {
//   setCart((prev) =>
//     prev,
//   );
//   setColorDropdown(false);
// };
// export async function removeItem(prevState: any, lineId: string) {
//   const cartId = cookies().get("cartId")?.value;

//   if (!cartId) {
//     return "Missing cart ID";
//   }

//   try {
//     await removeFromCart(cartId, [lineId]);
//     revalidateTag(TAGS.cart);
//   } catch (e) {
//     return "Error removing item from cart";
//   }
// }

// export async function updateItemQuantity(
//   prevState: any,
//   payload: {
//     lineId: string;
//     variantId: string;
//     quantity: number;
//   },
// ) {
//   const cartId = cookies().get("cartId")?.value;

//   if (!cartId) {
//     return "Missing cart ID";
//   }

//   const { lineId, variantId, quantity } = payload;

//   try {
//     if (quantity === 0) {
//       await removeFromCart(cartId, [lineId]);
//       revalidateTag(TAGS.cart);
//       return;
//     }

//     await updateCart(cartId, [
//       {
//         id: lineId,
//         merchandiseId: variantId,
//         quantity,
//       },
//     ]);
//     revalidateTag(TAGS.cart);
//   } catch (e) {
//     return "Error updating item quantity";
//   }
// }
