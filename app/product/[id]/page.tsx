import React from "react";
import { ProductDetailsComponent, ProductsRow } from "@/components";
import { ProductDetailPageProps } from "@/types";
import { fetchProduct, fetchProducts } from "@/lib";

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const id = params.id;

  const product = await fetchProduct(id);
  let products = await fetchProducts();
  products = products.filter((product) => product.id !== id);

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
