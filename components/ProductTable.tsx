"use client";
import { Product } from "@/types";
import React from "react";
import { SearchField, Sorting, CustomTable, LoadingLogo } from ".";
import ProductsAction from "./ProductsAction";

const ProductTable = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  return loading ? (
    <LoadingLogo />
  ) : (
    <div>
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">
          Products
        </h1>
        <div className="my-3 w-full">
          <SearchField />
        </div>
        <Sorting classNames=" ml-auto hidden h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white md:flex" />
      </div>
      <CustomTable
        data={filteredProducts.map((item) => ({
          ...item,
          sizes: item.sizes.join(", "),
          image: item.images[item.colors[0]][0],
        }))}
        header={["views", "image", "name", "colors", "sizes", "price"]}
        ActionComponent={ProductsAction}
      />
      <div>
        <button> addProduct </button>
      </div>
    </div>
  );
};

export default ProductTable;
