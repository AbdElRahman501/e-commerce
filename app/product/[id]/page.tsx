import React from "react";
import { ProductDetailsComponent, ProductsRow } from "@/components";
import { ProductDetailPageProps } from "@/types";

const ProductDetailPage = ({
  params,
  searchParams,
}: ProductDetailPageProps) => {
  const id = params.id;
  const c = searchParams.c;

  return (
    <section>
      <ProductDetailsComponent productId={id} color={c ? `#${c}` : ""} />
      <ProductsRow title="You may also like" url="/shop" />
    </section>
  );
};
export default ProductDetailPage;
