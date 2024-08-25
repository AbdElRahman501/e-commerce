import { FilterButton, SearchField, Sorting } from "@/components";
import CustomTable from "@/components/CustomTable";
import ProductsAction from "@/components/ProductsAction";
import { fetchProducts } from "@/lib/actions/product.actions";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    q: searchValue,
    select,
    selectedIds,
  } = searchParams as {
    [key: string]: string;
  };
  const products = await fetchProducts(searchValue);
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
            {selectedIds && (
              <Link
                className="rounded-lg bg-primary_color px-4 py-2 text-center text-white hover:bg-white hover:text-black"
                href={{
                  pathname: "/dashboard/products/update",
                  query: { selectedIds: selectedIds },
                }}
              >
                update
              </Link>
            )}
            <CustomTable
              isSelect={select === "true"}
              data={products.map((item) => ({
                ...item,
                image: item.images[0],
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
