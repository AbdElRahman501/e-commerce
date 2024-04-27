"use server";
import { toggleFavoriteItem } from "@/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function toggleFav(previousState: any, id: string) {
  const favData = cookies().get("favorite")?.value;
  const favorite: string[] = favData ? JSON.parse(favData) : [];
  const data = toggleFavoriteItem(favorite, id);
  cookies().set("favorite", JSON.stringify(data));
  revalidateTag("favorite");
}

export async function addFav(previousState: any, data: string[]) {
  if (!data) return "no data";
  cookies().set("favorite", JSON.stringify(data));
  revalidateTag("favorite");
  return "removed from favorite";
}
