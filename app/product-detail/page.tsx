import React from "react";
import { ProductDetailsComponent, ProductsRow } from "@/components";
import { products } from "@/constants";
import { ProductDetailPageProps } from "@/types";

const ProductDetailPage = ({ searchParams }: ProductDetailPageProps) => {
  const id = searchParams.id;
  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section>
      <ProductDetailsComponent product={product} />
      <ProductsRow title="You may also like" url="/shop" products={products} />
    </section>
  );
};
export default ProductDetailPage;
