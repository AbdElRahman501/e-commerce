import { ProductCard, SectionTitle } from ".";
import React from "react";
import { fetchFilteredProducts } from "@/lib";

async function ProductsRow({
  keyWords,
  title,
  url,
}: {
  keyWords?: string;
  url: string;
  title: string;
}) {
  const { products } = await fetchFilteredProducts({
    keywordFilter: keyWords || "",
    sort: title,
    limit: 4,
  });
  return (
    <section className="p-5 lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <SectionTitle title={title} url={url} />
        <div className="scroll-bar-hidden overflow-x-scroll md:overflow-hidden ">
          <div className="grid-container grid w-full gap-4 md:grid-cols-4 lg:gap-8 ">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductsRow;
