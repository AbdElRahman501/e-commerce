"use client";
import { ProductOnSaleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { StoreContext } from "./StoreContext";

const ProductCard = ({
  images,
  colors,
  id,
  title,
  price,
  salePrice,
  saleValue,
}: ProductOnSaleType) => {
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

  return (
    <div className="Product animate-fadeIn relative flex-col gap-4">
      {saleValue && (
        <div className="bg-primary_colo absolute left-4 top-0 z-10  w-min text-wrap text-center text-white">
          <p className="mb-3 h-full w-full bg-red-600 p-1">{saleValue} %</p>
          <div
            style={{
              transform: "rotate(90deg)",
              borderWidth: "20px 0 0 20px",
            }}
            className="triangle absolute -bottom-[7px]"
          ></div>
          <div
            style={{
              transform: "rotate(180deg)",
              borderWidth: "20px 0 0 20px",
            }}
            className="triangle absolute -bottom-[7px] right-0"
          ></div>
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
      <p className="w-full  ">{title}</p>
      {salePrice ? (
        <>
          <p className="text-xs text-gray-500 line-through">{price} EGP</p>
          <p className=" text-sm font-bold md:text-base ">{salePrice} EGP</p>
        </>
      ) : (
        <p className="text-sm font-bold  md:text-base ">{price} EGP</p>
      )}
    </div>
  );
};

export default ProductCard;
