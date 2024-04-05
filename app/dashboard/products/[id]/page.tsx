import React, { Suspense } from "react";
import { ProductDetailPageProps } from "@/types";
import { fetchProduct } from "@/lib";
import UpdateProduct from "@/components/product/UpdateProduct";

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const id = params.id;

  const product = await fetchProduct(id);

  if (!product) return null;

  return (
    <div className="flex flex-col gap-3 ">
      <Suspense>
        <UpdateProduct product={product} />
      </Suspense>
    </div>
  );
}
