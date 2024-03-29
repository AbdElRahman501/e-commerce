import { ProductCard } from "@/components";
import Message from "@/components/Message";
import { fetchProductsById } from "@/lib";
import { cookies } from "next/headers";

export default async function FavoritePage() {
  const favoriteData = cookies().get("favorite")?.value;
  const favorite: string[] = favoriteData ? JSON.parse(favoriteData) : [];
  const products = await fetchProductsById(favorite);

  return (
    <div className="min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-center text-3xl font-extrabold">Favorites</h1>
      {products.length === 0 ? (
        <Message message="Your favorite is empty" />
      ) : (
        <div className="grid grid-cols-2 gap-4  md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} fav={favorite} />
          ))}
        </div>
      )}
    </div>
  );
}
