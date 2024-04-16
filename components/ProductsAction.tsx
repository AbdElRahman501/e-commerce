"use server";
import { Product } from "@/types";
import Link from "next/link";
import RemoveProduct from "./product/RemoveProduct";
import DuplicateProduct from "./product/DuplicateProduct";

const ProductsAction = (item: Product) => {
  return (
    <>
      <Link
        href={`/dashboard/products/${item.id}`}
        className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
      >
        edit
      </Link>
      <DuplicateProduct id={item.id} />
      <RemoveProduct id={item.id} />
    </>
  );
};

export default ProductsAction;
