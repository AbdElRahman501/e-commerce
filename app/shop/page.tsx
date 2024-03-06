"use client";
import {
  CallToAction,
  FilterButton,
  FilterContainer,
  ProductCard,
  SearchField,
  Sorting,
  StoreContext,
} from "@/components";
import { filterInitialData } from "@/constants";
import { Product, FilterType } from "@/types";
import { filterAndSortProducts } from "@/utils";
import React, { useContext, useEffect, useState } from "react";

const ShopPage = () => {
  const { products } = useContext(StoreContext);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [sorting, setSorting] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>(filterInitialData);

  useEffect(() => {
    setFilteredProducts(
      filterAndSortProducts(products, filter, sorting, query),
    );
  }, [query, sorting, filter, products]);

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

  return (
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
          filter={filter}
          setFilter={setFilter}
          isOpen={isOpen}
          setSorting={setSorting}
          sorting={sorting}
        />
        <div className="rounded-4xl flex min-h-[60vh] flex-1 flex-col gap-4  ">
          <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
