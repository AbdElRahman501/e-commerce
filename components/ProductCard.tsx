"use client";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { StoreContext } from "./StoreContext";
import { offers } from "@/constants";
import { getSalePrice } from "@/utils";

const ProductCard = ({
  images,
  colors,
  id,
  title,
  price,
  categories,
  minPrice,
  keywords,
}: Product) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { favorite, setFavorite } = React.useContext(StoreContext);
  const isFav = favorite.includes(id);

  function toggleFavorite() {
    setFavorite((prev) => {
      return prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
    });
  }
  const { salePrice, saleValue } = getSalePrice(offers, {
    categories,
    price,
    minPrice,
    keywords,
  } as Product);
  return (
    <div className="Product animate-fadeIn relative flex-col gap-4">
      {saleValue && (
        <div className="bg-primary_colo absolute left-4 top-0 z-10  w-min overflow-hidden  text-wrap text-center text-white">
          <p className="mb-3 h-full w-full bg-red-600 p-1">{saleValue} %</p>
          <div className="absolute bottom-[2px] h-0 w-0 rotate-45 border-b-8 border-r-8 border-t-8 border-red-600"></div>
          <div className="absolute bottom-[2px] right-0 h-0 w-0 -rotate-45 border-b-8 border-r-8 border-t-8 border-red-600"></div>
        </div>
      )}
      <Link
        className="relative block"
        href={`/product/${id}?color=${selectedColor.replace("#", "HASH:")}`}
      >
        <div className="aspect-card relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200">
          <Image
            src={images[selectedColor || colors[0]][0]}
            alt="jacket"
            fill
            style={{ objectFit: "cover" }}
            className="duration-300 hover:scale-110"
          />
        </div>
      </Link>
      <div className="flex items-center justify-between p-1">
        <div className="flex w-4/5 items-center gap-1 ">
          {colors.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(item)}
              className={`${(selectedColor ? item === selectedColor : colors[0] === item) ? "scale-110  outline  outline-2 outline-blue-900 dark:outline-blue-400" : "border-transparent"} max-w-4 flex-1 rounded-full p-[1px] outline-offset-1 duration-200 hover:scale-110`}
            >
              <span
                style={{ backgroundColor: item }}
                className="block aspect-square w-full rounded-full border"
              ></span>
            </button>
          ))}
        </div>
        <button className="relative h-6 w-6" onClick={toggleFavorite}>
          <Image
            src={isFav ? "/icons/heart-fill.svg" : "/icons/heart.svg"}
            alt="heart icon"
            fill
            sizes="100%"
            className={` ${isFav ? "" : "dark:invert"} duration-200 hover:scale-110 `}
          />
        </button>
      </div>
      <p className="w-full text-sm md:text-base ">{title}</p>
      {salePrice ? (
        <p className="text-base font-bold md:text-xl">{salePrice} EGP</p>
      ) : (
        <p className="text-base  font-bold md:text-xl">{price} EGP</p>
      )}
    </div>
  );
};

export default ProductCard;
