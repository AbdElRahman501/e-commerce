import React, { Suspense } from "react";
import { ProductDetailPageProps } from "@/types";
import { fetchProduct } from "@/lib";
import UpdateProduct from "@/components/product/UpdateProduct";
import { fetchCollections } from "@/lib/actions/store.actions";

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const id = params.id;

  const product = await fetchProduct(id);
  const collections = await fetchCollections();

  if (!product) return null;

  return (
    <div className="flex flex-col gap-3 ">
      <Suspense>
        <UpdateProduct product={product} collections={collections} />
      </Suspense>
    </div>
  );
}
