"use client";
import { Product } from "@/types";
import { ProductCard, SectionTitle } from ".";
import { useEffect, useState } from "react";

const ProductsRow = ({ title, url }: { url: string; title: string }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        if (data.products) return setProducts(data.products);
      });
  }, []);

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
};

export default ProductsRow;
