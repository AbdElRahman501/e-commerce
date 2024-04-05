"use client";
import { ProductOnSaleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import AddToFav from "./favorite/AddToFav";
import React from "react";

interface ProductCardProps extends ProductOnSaleType {
  fav: string[];
}

const ProductCard = ({
  images,
  colors,
  id,
  title,
  price,
  salePrice,
  saleValue,
  fav = [],
}: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = React.useState<string>(colors[0]);
  const inFav = !!fav.find((item) => item === id);

  return (
    <div className="Product animate-fadeIn relative flex-col gap-4">
      {saleValue && (
        <div className="absolute right-2 top-2 z-10 text-center text-[10px] uppercase text-white md:text-xs">
          <p className="mb-3 h-full w-full  rounded-3xl bg-gray-950 p-1 px-4">
            Sale
          </p>
        </div>
      )}
      <Link className="relative block" href={`/product/${id}`}>
        <div className="aspect-card group relative overflow-hidden rounded-3xl ">
          <Image
            src={images[selectedColor][0]}
            alt="jacket"
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            className={`bg-gradient-to-r from-[#8c8c88] to-[#979a96] duration-700 hover:scale-105 `}
          />
        </div>
      </Link>
      <div className="flex items-center justify-between p-1">
        <div className="flex w-4/5 items-center gap-1 ">
          {colors.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(item)}
              className={`${(selectedColor ? item === selectedColor : colors[0] === item) ? "scale-110  outline  outline-2 outline-blue-900 dark:outline-blue-400" : "border-transparent"} max-w-5 flex-1 rounded-full p-[1px] outline-offset-1 duration-200 hover:scale-110`}
            >
              <span
                style={{ backgroundColor: item }}
                className="block aspect-square w-full rounded-full border"
              ></span>
            </button>
          ))}
        </div>
        <AddToFav id={id} inFav={inFav} />
      </div>
      <p className="w-full text-sm">{title}</p>
      {salePrice ? (
        <div className="flex items-center">
          <p className=" text-sm font-bold md:text-base ">{salePrice} EGP</p>
          <sup className="text-xs text-gray-500 line-through">{price} EGP</sup>
        </div>
      ) : (
        <p className="text-sm font-bold  md:text-base ">{price} EGP</p>
      )}
    </div>
  );
};

export default ProductCard;
