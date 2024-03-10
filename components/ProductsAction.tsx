"use client";
import { Product } from "@/types";
import Link from "next/link";

const ProductsAction = (item: Product) => {
  return (
    <>
      <Link
        href={`/dashboard/edit-product/${item.id}`}
        className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
      >
        edit
      </Link>
      <button
        onClick={() => console.log(item.id)}
        className=" text-red-500 hover:underline dark:text-red-400 dark:hover:underline "
      >
        remove
      </button>
    </>
  );
};

export default ProductsAction;
