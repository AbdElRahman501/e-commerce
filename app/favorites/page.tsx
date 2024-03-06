"use client";
import { ProductCard, StoreContext } from "@/components";
import Link from "next/link";
import React, { useContext } from "react";

const FavoritePage = () => {
  const { favorite, products } = useContext(StoreContext);

  if (favorite.length === 0) {
    return (
      <div className="min-h-[88vh] p-5 lg:px-20">
        <h1 className="pb-5 text-xl font-semibold md:text-3xl">
          Favorite Products
        </h1>

        <div className="rounded-md bg-gray-200 p-5 text-center dark:bg-gray-700  lg:px-20">
          {" "}
          <h3 className="text-xl font-bold">Your Favorites is empty </h3>
          <Link href="/shop" className=" underline hover:no-underline ">
            Add some products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">
        Favorite Products
      </h1>
      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
        {products
          .filter((product) => favorite.includes(product.id))
          .map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
      </div>
    </div>
  );
};

export default FavoritePage;
