"use server";
import {
  deleteProduct,
  updateProductById,
} from "@/lib/actions/product.actions";
import { Product } from "@/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function removeProduct(previousState: any, id: string) {
  if (id) {
    await deleteProduct(id);
  }

  revalidateTag("product");
  return "removed from cart";
}

export async function updateProduct(previousState: any, data: Product) {
  if (data) {
    const updatedProduct = await updateProductById(data);
    if (updatedProduct) {
      redirect(`/product/${updatedProduct.id}`);
      return "updated product";
    } else {
      return "failed to update product";
    }
  }
  revalidateTag("updated product");
  return "removed from cart";
}
