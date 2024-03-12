"use client";
import React from "react";
import {
  LoadingLogo,
  ProductDetailsComponent,
  ProductsRow,
} from "@/components";
import { Product, ProductDetailPageProps } from "@/types";
import { getProduct } from "@/utils";
import { filterInitialData } from "@/constants";

const ProductDetailPage = ({
  params,
  searchParams,
}: ProductDetailPageProps) => {
  const id = params.id;
  const { c } = searchParams;
  const color = c ? c.replace("HASH:", "#") : "";

  const [product, setProduct] = React.useState<Product>({} as Product);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!product?.id) {
      getProduct(setProduct, setLoading, id);
    }
  }, [product]);

  return (
    <section>
      {loading ? (
        <LoadingLogo />
      ) : !product?.id ? (
        <div className="flex h-screen items-center justify-center">
          <div> Product not found </div>
        </div>
      ) : (
        <ProductDetailsComponent
          product={product}
          color={color}
          productId={id}
        />
      )}
      {product?.id && (
        <ProductsRow
          customFilter={{
            ...filterInitialData,
            selectedCategories: product?.categories
              ? product?.categories.split(",")
              : [],
            colorFilter: product?.colors || [],
            keywordFilter: product?.keywords,
          }}
          title="You may also like"
          url="/shop"
        />
      )}
    </section>
  );
};
export default ProductDetailPage;
