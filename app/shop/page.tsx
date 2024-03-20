import { LoadMore, ProductCard } from "@/components";
import { getAsyncProducts } from "@/lib/utils";

export const metadata = {
  title: "Shop",
  description: "Search for products in the store.",
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue, l } = searchParams as {
    [key: string]: string;
  };
  const limit = l ? parseInt(l) : 12;

  const { products, count } = await getAsyncProducts({
    query: searchValue,
    priceSorting: 0,
    selectedCategories: [],
    keywordFilter: "",
    minPrice: 0,
    originFilter: [],
    maxPrice: 0,
    genderFilter: "all",
    colorFilter: [],
    sizeFilter: [],
    limit,
    section: "",
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

      <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      {count > limit && <LoadMore />}
    </>
  );
}
