import React from "react";
import { ProductDetailsComponent, ProductsRow } from "@/components";
import { products } from "@/constants";
import { ProductDetailPageProps } from "@/types";
import { fetchProduct } from "@/lib";
import Link from "next/link";

const ProductDetailPage: React.FC<ProductDetailPageProps> = async ({
  searchParams,
}: ProductDetailPageProps) => {
  const id = searchParams.id;

  const product = await fetchProduct(id);

  if (!product) {
    return (
      <div className="p-5 lg:px-20">
        <div className="rounded-md bg-gray-200 p-5 text-center dark:bg-gray-700  lg:px-20">
          {" "}
          <h3 className="text-xl font-bold">Product not found</h3>
          <Link href="/shop" className=" underline hover:no-underline ">
            You can find some products here
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section>
      <ProductDetailsComponent product={product} />
      <ProductsRow title="You may also like" url="/shop" products={products} />
    </section>
  );
};
export default ProductDetailPage;
