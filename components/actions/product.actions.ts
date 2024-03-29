"use server";
import { deleteProduct } from "@/lib/actions/product.actions";
import { revalidateTag } from "next/cache";

export async function removeProduct(previousState: any, id: string) {
  if (id) {
    await deleteProduct(id);
  }

  revalidateTag("product");
  return "removed from cart";
}
