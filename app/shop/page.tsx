import { LoadMore, ProductCard } from "@/components";
import { fetchFilteredProducts } from "@/lib";
import { cookies } from "next/headers";

export const metadata = {
  title: "Shop",
  description: "Search for products in the store.",
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const favData = cookies().get("favorite")?.value;
  const fav: string[] = favData ? JSON.parse(favData) : [];

  const {
    q: searchValue,
    l,
    sort,
    gf,
    ctf,
    szf,
    clf,
    minP,
    maxP,
    kw,
    collection,
  } = searchParams as {
    [key: string]: string;
  };
  const genderParams = gf ? parseInt(gf) : null;
  const gender =
    genderParams === null ? "all" : genderParams === 1 ? "male" : "female";
  const limit = l ? parseInt(l) : 12;
  const colorFilter = clf ? clf.split(",") : [];
  const sizeFilter = szf ? szf.split(",") : [];
  const categoryFilter = ctf ? ctf.split(",") : [];

  const minPrice = minP ? parseInt(minP) : 0;
  const maxPrice = maxP ? parseInt(maxP) : 1000;

  const { products, count } = await fetchFilteredProducts({
    query: searchValue,
    sort: sort || "",
    selectedCategories: categoryFilter,
    keywordFilter: kw,
    minPrice: minPrice,
    originFilter: [],
    maxPrice: maxPrice,
    genderFilter: gender,
    colorFilter: colorFilter,
    sizeFilter: sizeFilter,
    limit,
  });
  const resultsText = products.length > 1 ? "results" : "result";
  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} fav={fav} {...product} />
        ))}
      </div>
      {count > limit && <LoadMore newLimit={limit + 12} />}
    </>
  );
}
