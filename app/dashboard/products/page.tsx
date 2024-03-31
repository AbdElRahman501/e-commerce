import { FilterButton, SearchField, Sorting } from "@/components";
import CustomTable from "@/components/CustomTable";
import FilterSection from "@/components/FilterSection";
import ProductsAction from "@/components/ProductsAction";
import { fetchFilteredProducts } from "@/lib";
import { Suspense } from "react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    q: searchValue,
    sort,
    gf,
    ctf,
    szf,
    clf,
    minP,
    maxP,
  } = searchParams as {
    [key: string]: string;
  };
  const genderParams = gf ? parseInt(gf) : null;
  const gender =
    genderParams === null ? "all" : genderParams === 1 ? "male" : "female";
  const colorFilter = clf ? clf.split(",") : [];
  const sizeFilter = szf ? szf.split(",") : [];
  const categoryFilter = ctf ? ctf.split(",") : [];

  const minPrice = minP ? parseInt(minP) : 0;
  const maxPrice = maxP ? parseInt(maxP) : 1000;

  const { products } = await fetchFilteredProducts({
    query: searchValue,
    sort: sort || "",
    selectedCategories: categoryFilter,
    keywordFilter: "",
    minPrice: minPrice,
    originFilter: [],
    maxPrice: maxPrice,
    genderFilter: gender,
    colorFilter: colorFilter,
    sizeFilter: sizeFilter,
    limit: 99999,
  });
  const resultsText = products.length > 1 ? "results" : "result";
  return (
    <Suspense>
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">
          Products
        </h1>
        <SearchField />
        <FilterButton />
        <Sorting classNames=" ml-auto hidden h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white md:flex" />
      </div>
      <div className="flex gap-4 p-5 lg:px-20">
        <Suspense>
          <FilterSection />
        </Suspense>
        <div className="flex w-full flex-col gap-5">
          {searchValue ? (
            <p className="mb-4">
              {products.length === 0
                ? "There are no products that match "
                : `Showing ${products.length} ${resultsText} for `}
              <span className="font-bold">&quot;{searchValue}&quot;</span>
            </p>
          ) : null}
          <div className="flex flex-col gap-2">
            <CustomTable
              data={products.map((item) => ({
                ...item,
                image: item.images[item.colors[0]][0],
              }))}
              header={["views", "sales", "image", "title", "price"]}
              ActionComponent={ProductsAction}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
