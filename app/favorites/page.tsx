import { fetchProductsById } from "@/lib";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ProductCard = dynamic(() => import("@/components/ProductCard"));
const Message = dynamic(() => import("@/components/Message"));
export default async function FavoritePage() {
  const favoriteData = cookies().get("favorite")?.value;
  const favorite: string[] = favoriteData ? JSON.parse(favoriteData) : [];
  const products = await fetchProductsById(favorite);

  return (
    <div className="max-w-8xl mx-auto min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-center text-3xl font-extrabold">Favorites</h1>
      {products.length === 0 ? (
        <Message message="Your favorite is empty" />
      ) : (
        <div className="grid grid-cols-2 gap-4  md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
          {products.map((product) => (
            <Suspense key={product.id}>
              <ProductCard {...product} fav={favorite} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
}
