"use server";
import { ProductCard, SectionTitle } from ".";
import React from "react";
import { fetchFilteredProducts } from "@/lib";
import { cookies } from "next/headers";
import { ProductOnSaleType } from "@/types";

async function ProductsRow({
  keyWords,
  title,
  url,
  initialProducts,
}: {
  initialProducts?: ProductOnSaleType[];
  keyWords?: string;
  url: string;
  title: string;
}) {
  const favData = cookies().get("favorite")?.value;
  const fav: string[] = favData ? JSON.parse(favData) : [];
  const { products } = initialProducts
    ? { products: initialProducts }
    : await fetchFilteredProducts({
        keywordFilter: keyWords || "",
        sort: title,
        limit: 4,
        minLimit: 3,
      });

  if (products.length === 0) {
    return null;
  }
  return (
    <section className="mx-auto max-w-8xl p-5 lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <SectionTitle title={title} url={url} />
        <div className="scroll-bar-hidden overflow-x-scroll ">
          <div className="flex w-full gap-4">
            {products.map((product) => (
              <ProductCard
                className="min-w-[306px] flex-1"
                fav={fav}
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductsRow;
