import { ProductCard } from "@/components";
import { products } from "@/constants";
import React from "react";

const FavoritePage = () => {
  const productsList = Array(3).fill(products).flat();

  return (
    <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-3 lg:px-20 xl:grid-cols-3  2xl:grid-cols-4">
      {productsList.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default FavoritePage;
