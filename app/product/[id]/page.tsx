import React from "react";
import { ProductDetailsComponent, ProductsRow } from "@/components";
import { ProductDetailPageProps } from "@/types";
import { fetchProduct, fetchProducts } from "@/lib";

const ProductDetailPage = async ({
  params,
  searchParams,
}: ProductDetailPageProps) => {
  const id = params.id;
  const c = searchParams.c;

  const product = await fetchProduct(id);
  let products = await fetchProducts();
  products = products.filter((product) => product.id !== id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section>
      <ProductDetailsComponent product={product} color={c ? `#${c}` : ""} />
      <ProductsRow title="You may also like" url="/shop" products={products} />
    </section>
  );
};
export default ProductDetailPage;
