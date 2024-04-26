"use client";
import { ProductOnSaleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { firstMatch, formatPrice, toggleFavoriteItem } from "@/utils";
import { toggleFav } from "./actions/fav.actions";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const CustomForm = dynamic(() => import("./CustomForm"));
const SubmitButton = dynamic(() => import("./SubmitButton"));
const HeartIcon = dynamic(() => import("./icons/HeartIcon"));
const LoadingDots = dynamic(() => import("./loading-dots"));

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
  const searchParams = useSearchParams();
  const [selectedColor, setSelectedColor] = React.useState<string>(colors[0]);
  const isFav = !!fav.find((item) => item === id);

  useEffect(() => {
    const colorFilter = searchParams?.get("clf")?.length
      ? searchParams?.get("clf")?.split(",") || []
      : [];
    const color = firstMatch(colorFilter, colors);
    setSelectedColor(color || colors[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const toggleFavItemAction = () => {
    if (typeof window == "undefined") return;
    const favData = localStorage.getItem("favoriteItems");
    const favorite: string[] = favData ? JSON.parse(favData) : [];
    localStorage.setItem(
      "favoriteItems",
      JSON.stringify(toggleFavoriteItem(favorite, id)),
    );
  };

  return (
    <div className={` animate-fadeIn relative  flex-col gap-4 ${className}`}>
      {saleValue && (
        <div className="absolute left-2 top-2 z-10 text-center text-[10px] uppercase text-white md:text-xs">
          <p className="mb-3 h-full w-full  rounded-full bg-gray-950 p-1 px-4">
            Sale
          </p>
        </div>
      )}
      <div className="relative">
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
        <div className="absolute bottom-2 right-2 rounded-full bg-white p-2 text-black ">
          <CustomForm
            action={toggleFav}
            customAction={toggleFavItemAction}
            data={id}
            className="h-5 w-5"
          >
            <SubmitButton
              loadingItem={
                <p className="text-center text-2xl">
                  <LoadingDots />
                </p>
              }
              type="submit"
            >
              {isFav ? (
                <HeartIcon
                  fillRule="nonzero"
                  className="h-5 w-5 text-red-800  duration-200 hover:scale-110"
                />
              ) : (
                <HeartIcon
                  fillRule="evenodd"
                  className="h-5 w-5  duration-200 hover:scale-110"
                />
              )}
            </SubmitButton>
          </CustomForm>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4 text-center">
        <p className="w-full  text-sm font-bold">{title}</p>
        <div className="relative flex items-center justify-center pt-2">
          {salePrice ? (
            <>
              <p className="absolute -left-10 -top-1 w-full text-xs text-[#1a1a1ab3] line-through dark:text-gray-300 md:-top-2 md:text-base">
                {formatPrice(price, "EGP")}
              </p>
              <p className=" text-sm text-[#1a1a1ab3] dark:text-gray-300 md:text-base ">
                {formatPrice(salePrice, "EGP")}
              </p>
            </>
          ) : (
            <p className="text-sm text-[#1a1a1ab3] dark:text-gray-300 md:text-base ">
              {formatPrice(price, "EGP")}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-2">
          {colors.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(item)}
              className={`${(selectedColor ? item === selectedColor : colors[0] === item) ? "border-2 border-black p-[1px] dark:border-white" : "border-transparent"} max-w-6 flex-1 rounded-full p-[1px] duration-200 hover:scale-110`}
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
