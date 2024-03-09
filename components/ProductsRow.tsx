"use client";
import { Product } from "@/types";
import { ProductCard, SectionTitle, ProductSkeleton } from ".";
import React from "react";
import { getProducts } from "@/utils";

const ProductsRow = ({ title, url }: { url: string; title: string }) => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getProducts(setProducts, setLoading);
  }, []);

  return loading ? (
    <ProductSkeleton />
  ) : (
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
};

export default ProductsRow;
