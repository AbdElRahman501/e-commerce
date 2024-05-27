"use client";
import { ProductOnSaleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  calculateMinPrice,
  calculatePrice,
  firstMatch,
  formatPrice,
  getAllImages,
  getFirstOptionsWithSubVariants,
  getSale,
  toggleFavoriteItem,
} from "@/utils";
import { toggleFav } from "./actions/fav.actions";
import { useSearchParams } from "next/navigation";
import HeartIcon from "./icons/HeartIcon";

interface ProductCardProps extends ProductOnSaleType {
  fav: string[];
  className?: string;
  index?: number;
}

const ProductCard = ({
  images,
  id,
  title,
  price: basePrice,
  minPrice: baseMinPrice,
  saleValue,
  variations,
  fav = [],
  className,
  index = 0,
}: ProductCardProps) => {
  const [isFav, setIsFav] = React.useState(!!fav.find((item) => item === id));
  const colors =
    variations
      .find((variant) => variant.type === "color")
      ?.options?.map((item) => item.name) || [];

  const searchParams = useSearchParams();
  const colorFilter = searchParams?.get("clf")?.length
    ? searchParams?.get("clf")?.split(",") || []
    : [];
  const color = firstMatch(colorFilter, colors) || "";
  const [selectedColor, setSelectedColor] = React.useState<string>(
    color || colors[0],
  );
  const [[firstImage, secondImage], setImages] = React.useState<string[]>(
    images[selectedColor].length > 1
      ? images[selectedColor]
      : [
          ...images[selectedColor],
          ...getAllImages(images).filter(
            (img) => !images[selectedColor].includes(img),
          ),
        ],
  );
  const selectedOptions = getFirstOptionsWithSubVariants(variations);
  const price = calculatePrice(basePrice, selectedOptions, variations);
  const minPrice = calculateMinPrice(baseMinPrice, selectedOptions, variations);
  const salePrice = getSale(minPrice, price, saleValue);

  const selectColor = (color: string) => {
    setSelectedColor(color);
    setImages(
      images[color].length > 1
        ? images[color]
        : [
            ...images[color],
            ...getAllImages(images).filter(
              (img) => !images[color].includes(img),
            ),
          ],
    );
  };

  useEffect(() => {
    selectColor(firstMatch(colorFilter, colors) || colors[0]);
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
    <div className={` relative  flex-col gap-4 ${className}`}>
      {saleValue && (
        <div className="absolute left-2 top-2 z-10 text-center text-[10px] uppercase text-white md:text-xs">
          <p className="mb-3 h-full w-full  rounded-full bg-gray-950 p-1 px-4">
            Sale
          </p>
        </div>
      )}
      <div className="relative">
        <Link
          className="relative block"
          aria-label={`Link to product ${title}`}
          href={{
            pathname: `/product/${id}`,
            query: { color: selectedColor.toString().replace("#", "HASH:") },
          }}
        >
          <div className="aspect-card group relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200">
            <Image
              src={firstImage}
              alt={`${title + " Color " + selectedColor} image`}
              fill
              sizes="100%"
              priority={index < 3}
              style={{ objectFit: "cover" }}
              className={`duration-300 ${secondImage ? "group-hover:opacity-0" : "hover:scale-105"} `}
            />
            {secondImage && (
              <Image
                src={secondImage}
                alt={`${title + " Color " + selectedColor} image`}
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
                priority={index < 3}
                className="opacity-0 duration-300 group-hover:opacity-100"
              />
            )}
          </div>
        </Link>
        <button
          onClick={async () => {
            setIsFav(!isFav);
            await toggleFav(id);
            toggleFavItemAction();
          }}
          aria-label="Add to favorites"
          type="button"
          className="absolute bottom-2  right-2 rounded-full bg-white p-2 text-black "
        >
          <div className="h-5 w-5">
            <HeartIcon
              fillRule={isFav ? "nonzero" : "evenodd"}
              className={`${isFav ? "text-red-800" : ""} w-full  duration-200 hover:scale-110`}
            />
          </div>
        </button>
      </div>
      <div className="flex flex-col gap-1 p-4 text-center">
        <p className="line-clamp-2  w-full  font-bold">{title}</p>
        <div className="relative flex items-center justify-center gap-2">
          <p
            className={` ${salePrice ? "line-through opacity-80" : ""}  text-[#1a1a1ab3]  dark:text-gray-300 md:text-base`}
          >
            {formatPrice(price, "EGP")}
          </p>
          {salePrice && (
            <p className=" text-[#1a1a1ab3] dark:text-gray-300 md:text-base ">
              {formatPrice(salePrice, "EGP")}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-2">
          {colors.map((item, index) => (
            <button
              key={index}
              type="button"
              aria-label={"Select color " + item}
              onClick={() => selectColor(item)}
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
