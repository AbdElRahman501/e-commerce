"use client";
import {
  CallToAction,
  FilterButton,
  FilterContainer,
  LoadingLogo,
  ProductCard,
  SearchField,
  Sorting,
} from "@/components";
import { filterInitialData } from "@/constants";
import { Product, FilterType, CategoryCount } from "@/types";
import { getAllCategories, getFilteredProducts } from "@/utils";
import React, { useEffect, useState } from "react";

const ShopPage = ({
  searchParams,
}: {
  searchParams: { section: string; category: string };
}) => {
  const { section, category } = searchParams;
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = useState<string>("");
  const [sorting, setSorting] = useState("");
  const [limit, setLimit] = useState(12);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>(filterInitialData);
  const [categories, setCategories] = React.useState<CategoryCount[]>([]);

  useEffect(() => {
    getAllCategories(setCategories);
  }, []);

  useEffect(() => {
    if (
      categories
        .map((x) => x.name.trim().toLowerCase())
        .includes(category.trim().toLowerCase())
    ) {
      setFilter({
        ...filter,
        selectedCategories: [...filter.selectedCategories, category],
      });
    }
  }, [categories]);

  useEffect(() => {
    getFilteredProducts({
      section,
      sorting,
      filter,
      query,
      setProducts,
      setLoading,
      limit,
      setCount,
    });
  }, [query, sorting, filter, limit]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("max-md:overflow-hidden");
    } else {
      document.body.classList.remove("max-md:overflow-hidden");
    }
    return () => {
      document.body.classList.remove("max-md:overflow-hidden");
    };
  }, [isOpen]);

  return loading && products.length === 0 ? (
    <LoadingLogo />
  ) : (
    <main>
      <CallToAction />
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">
          Products
        </h1>
        <SearchField
          setIsOpen={setIsOpen}
          query={query}
          changeHandler={setQuery}
        />
        <FilterButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <Sorting
          classNames=" ml-auto hidden h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white md:flex"
          setSorting={setSorting}
          sorting={sorting}
        />
      </div>
      <div className="flex gap-4 p-5 lg:px-20">
        <FilterContainer
          categories={categories}
          filter={filter}
          setFilter={setFilter}
          isOpen={isOpen}
          setSorting={setSorting}
          sorting={sorting}
        />
        <div className="rounded-4xl flex min-h-[60vh] flex-1 flex-col gap-4  ">
          <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
          {count > limit && (
            <button
              onClick={() => setLimit(limit + 12)}
              className="group mt-2 h-12 w-full overflow-hidden rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
            >
              <p className="duration-500 group-hover:scale-110">
                {" "}
                {loading ? "Loading..." : "Load More"}{" "}
              </p>
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
