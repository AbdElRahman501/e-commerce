"use server";
import {
  deleteProduct,
  duplicateProductById,
  updateMultipleProducts,
  updateProductById,
} from "@/lib/actions/product.actions";
import { Product } from "@/types";
import { redirect } from "next/navigation";

export async function removeProduct(previousState: any, id: string) {
  if (id) {
    await deleteProduct(id);
  }
  return "error not found in remove product";
}

export async function updateProduct(previousState: any, data: Product) {
  if (data) {
    const updatedProduct = await updateProductById(data);
    if (updatedProduct) {
      redirect(`/product/${updatedProduct.id}`);
    } else {
      return "failed to update product";
    }
  }
  return "error not found in update product";
}

function isValidValue(value: any): boolean {
  return value !== null && value !== undefined && value !== "";
}

export async function updateProducts(
  previousState: any,
  { ids, data }: { ids: string[]; data: Product },
) {
  if (data) {
    const updateData: Partial<Product> = {};
    Object.keys(data).forEach((key) => {
      const value = (data as any)[key];
      if (isValidValue(value)) {
        (updateData as any)[key] = value;
      }
    });
    await updateMultipleProducts(ids, data);
  }
  return "error not found in update products";
}

export async function duplicateProduct(previousState: any, id: string) {
  if (id) {
    const createdProduct = await duplicateProductById(id);
    if (createdProduct) {
      redirect(`/dashboard/products/${createdProduct.id}`);
    } else {
      return "failed to duplicate product";
    }
  }
  return "error not found in duplicate product";
}
