"use client";
import { LoadingLogo, ProductCard, StoreContext } from "@/components";
import { ProductOnSaleType } from "@/types";
import { getProductsByIds } from "@/utils";
import Link from "next/link";
import React, { useContext } from "react";

const FavoritePage = () => {
  const { favorite } = useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<ProductOnSaleType[]>([]);

  React.useEffect(() => {
    getProductsByIds(favorite, setProducts, setLoading);
  }, [favorite]);

  if (favorite.length === 0 && !loading) {
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

  return loading ? (
    <LoadingLogo />
  ) : (
    <div className="min-h-[88vh] p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">
        Favorite Products
      </h1>
      <div className="grid grid-cols-2 gap-4  md:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
