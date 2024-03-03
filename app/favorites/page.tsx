"use client";
import { ProductCard, StoreContext } from "@/components";
import { Product } from "@/types";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const FavoritePage = () => {
  const { favorite } = useContext(StoreContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorite.length > 0) {
      fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: favorite }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data) return;
          if (data.products) setProducts(data.products);
          setLoading(false);
        });
    }
  }, [favorite]);

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

  const favoriteProducts = products.filter((product) =>
    favorite.includes(product.id),
  );

  return (
    <div className="min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">
        Favorite Products
      </h1>
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
        {favoriteProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
