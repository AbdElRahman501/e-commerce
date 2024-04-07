"use client";
import { ProductOnSaleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import AddToFav from "./favorite/AddToFav";
import React from "react";
import { formatPrice } from "@/utils";

interface ProductCardProps extends ProductOnSaleType {
  fav: string[];
  className?: string;
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
  className,
}: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = React.useState<string>(colors[0]);
  const inFav = !!fav.find((item) => item === id);

  return (
    <div className={` animate-fadeIn relative  flex-col gap-4 ${className}`}>
      {saleValue && (
        <div className="absolute left-2 top-2 z-10 text-center text-[10px] uppercase text-white md:text-xs">
          <p className="mb-3 h-full w-full  rounded-sm bg-gray-950 p-1 px-4">
            Sale
          </p>
        </div>
      )}
      <Link className="relative block" href={`/product/${id}`}>
        <div className="aspect-card group relative overflow-hidden rounded-md ">
          <Image
            src={images[selectedColor][0]}
            alt="jacket"
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            className={`bg-gradient-to-r from-[#8c8c88] to-[#979a96] duration-700 hover:scale-105 `}
          />
          <div className="absolute bottom-2 right-2 ">
            <AddToFav id={id} inFav={inFav} />
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-1 p-4 text-center">
        <p className="w-full  text-sm font-bold">{title}</p>
        {salePrice ? (
          <div className="flex items-center justify-center text-[#1a1a1ab3]">
            <sup className="text-xs line-through">
              {formatPrice(price, "EGP")}
            </sup>
            <p className=" text-sm md:text-base ">{salePrice} EGP</p>
          </div>
        ) : (
          <p className="text-sm  text-[#1a1a1ab3] md:text-base ">
            {formatPrice(price, "EGP")}
          </p>
        )}

        <div className="flex items-center justify-center gap-2">
          {colors.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(item)}
              className={`${(selectedColor ? item === selectedColor : colors[0] === item) ? "border-2 border-black p-[1px]" : "border-transparent"} max-w-6 flex-1 rounded-full p-[1px] duration-200 hover:scale-110`}
            >
              <span
                style={{ backgroundColor: item }}
                className="block aspect-square w-full rounded-full border"
              ></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
