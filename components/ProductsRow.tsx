"use server";
import { ProductCard, SectionTitle } from ".";
import React from "react";
import { fetchFilteredProducts } from "@/lib";
import { cookies } from "next/headers";
import { FilterProps, ProductOnSaleType } from "@/types";
import SliderHead from "./SliderHead";

async function ProductsRow({
  title,
  url,
  initialProducts,
  filter,
}: {
  filter?: FilterProps;
  initialProducts?: ProductOnSaleType[];
  url: string;
  title: string;
}) {
  const favData = cookies().get("favorite")?.value;
  const fav: string[] = favData ? JSON.parse(favData) : [];
  const products = initialProducts
    ? initialProducts
    : await fetchFilteredProducts({
        sort: title,
        limit: 4,
        minLimit: 3,
        ...filter,
      });

  if (products.length === 0) {
    return null;
  }
  return (
    <section className="mx-auto max-w-8xl p-5 lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <SectionTitle title={title} url={url} />
        <SliderHead
          containerClass="relative"
          carouselClass="scroll-bar-hidden flex w-full gap-4 overflow-x-scroll"
          length={products.length}
        >
          {products.map((product, index) => (
            <ProductCard
              className="min-w-[306px] flex-1 snap-x snap-mandatory snap-start"
              fav={fav}
              key={product.id}
              {...product}
              index={index}
            />
          ))}
        </SliderHead>
      </div>
    </section>
  );
}
export default ProductsRow;
