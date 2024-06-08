import React, { Suspense } from "react";
import ProductsRow from "./ProductsRow";
import { fetchFilteredProducts } from "@/lib";
import { ProductSkeleton } from "./LoadingSkeleton";

const ProductsRows = async () => {
  const trendingProducts = await fetchFilteredProducts({
    sort: "Trending",
    limit: 4,
  });
  const newArrivalsProducts = await fetchFilteredProducts({
    sort: "New Arrivals",
    limit: 4,
    minLimit: 4,
    idsToExclude: trendingProducts.map((product) => product.id),
  });
  const bestSellersProducts = await fetchFilteredProducts({
    sort: "Best Sellers",
    limit: 4,
    minLimit: 4,
    idsToExclude: [
      ...newArrivalsProducts.map((product) => product.id),
      ...trendingProducts.map((product) => product.id),
    ],
  });

  return (
    <>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsRow
          initialProducts={trendingProducts.slice(0, 4)}
          title="Trending"
          url="/shop?sort=Trending"
        />
      </Suspense>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsRow
          initialProducts={newArrivalsProducts.slice(0, 4)}
          title="New Arrivals"
          url="/shop?sort=New Arrivals"
        />
      </Suspense>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsRow
          initialProducts={bestSellersProducts.slice(0, 4)}
          title="Best Sellers"
          url="/shop?sort=Best Sellers"
        />
      </Suspense>
    </>
  );
};

export default ProductsRows;
