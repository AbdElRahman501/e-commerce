"use client";
import {
  CallToAction,
  FilterButton,
  FilterContainer,
  ProductCard,
  SearchField,
  Sorting,
} from "@/components";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState<string>("");
  const [sorting, setSorting] = useState("");

  useEffect(() => {
    const ascendingPrice =
      sorting === "Price: Low to High"
        ? 1
        : sorting === "Price: High to Low"
          ? -1
          : 0;

    fetch(`/api/products?query=${query}&priceSorting=${ascendingPrice}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        if (data.products) setProducts(data.products);
        setLoading(false);
      });
  }, [query, sorting]);

  const [isOpen, setIsOpen] = useState(false);
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
          isOpen={isOpen}
          setSorting={setSorting}
          sorting={sorting}
        />
        <div className="rounded-4xl flex min-h-[60vh] flex-1 flex-col gap-4  ">
          {loading && <p>Loading...</p>}
          <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
