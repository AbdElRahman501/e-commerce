"use client";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { StoreContext } from "./StoreContext";

const ProductCard = ({ images, colors, id, title, price }: Product) => {
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

  function colorDefiner() {
    const hexColorRegex = /^#?([0-9A-F]{3}){1,2}$/i;
    const isHex =
      typeof selectedColor === "string" && hexColorRegex.test(selectedColor);
    return isHex ? `hex=${selectedColor.slice(1)}` : `c=${selectedColor}`;
  }

  return (
    <div className="Product flex-col gap-4">
      <Link
        href={
          selectedColor ? `/product/${id}?${colorDefiner()}` : `/product/${id}`
        }
      >
        <div className="aspect-card relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200">
          <Image
            src={images[selectedColor || colors[0]][0]}
            alt="jacket"
            fill
            objectFit="cover"
            sizes="100%"
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
      <p className="text-base  font-bold md:text-xl">{price} EGP</p>
    </div>
  );
};

export default ProductCard;
