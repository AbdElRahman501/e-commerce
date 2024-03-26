"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function toggleFav(previousState: any, id: string) {
  const favData = cookies().get("favorite")?.value;
  const favorite: string[] = favData ? JSON.parse(favData) : [];
  let isFav: boolean = false;

  if (favorite) {
    isFav = !!favorite.find((item) => item === id);
  }

  if (!isFav) {
    const data = [...favorite, id];
    cookies().set("favorite", JSON.stringify(data));
    revalidateTag("favorite");
    return !isFav;
  } else {
    const data = favorite.filter((item) => item !== id);
    cookies().set("favorite", JSON.stringify(data));
    revalidateTag("favorite");
    return !isFav;
  }
}
