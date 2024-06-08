"use server";
import { likeProduct } from "@/lib/actions/product.actions";
import { toggleFavoriteItem } from "@/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function toggleFav(id: string) {
  const favData = cookies().get("favorite")?.value;
  const favorite: string[] = favData ? JSON.parse(favData) : [];
  const data = toggleFavoriteItem(favorite, id);
  const isFave = data.includes(id);
  isFave && likeProduct(id);
  cookies().set("favorite", JSON.stringify(data));
  revalidateTag("favorite");
}

export async function addFav(p: any, data: string[]) {
  if (!data) return "no data";
  cookies().set("favorite", JSON.stringify(data));
  revalidateTag("favorite");
  return "removed from favorite";
}
