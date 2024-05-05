import React, { Suspense } from "react";
import ProductsRow from "./ProductsRow";
import { fetchFilteredProducts } from "@/lib";
import { ProductSkeleton } from "./LoadingSkeleton";

const ProductsRows = async () => {
  let myCount = 0;
  const { products: trendingProducts, count } = await fetchFilteredProducts({
    sort: "Trending",
    limit: 4,
  });
  myCount = count - 4;
  const { products: newArrivalsProducts } = await fetchFilteredProducts({
    sort: "New Arrivals",
    limit: 4,
    minLimit: myCount === 0 ? 0 : 4,
    idsToExclude: trendingProducts.map((product) => product.id),
  });
  myCount = myCount >= 4 ? myCount - 4 : 0;
  const { products: bestSellersProducts } = await fetchFilteredProducts({
    sort: "Best Sellers",
    limit: 4,
    minLimit: myCount === 0 ? 0 : 4,
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
