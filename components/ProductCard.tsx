"use server";
import { ProductOnSaleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import AddToFav from "./favorite/AddToFav";

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
  const inFav = !!fav.find((item) => item === id);
  return (
    <div className="Product animate-fadeIn relative flex-col gap-4">
      {saleValue && (
        <div className="bg-primary_colo absolute left-4 top-0 z-10  w-min text-wrap text-center text-xs text-white md:text-sm">
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
      <Link className="relative block" href={`/product/${id}`}>
        <div className="aspect-card relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-100 to-slate-200">
          <Image
            src={images[colors[0]][0]}
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
            <div
              key={index}
              className={` "scale-110  dark:outline-blue-400"  : "border-transparent"} max-w-4 flex-1 rounded-full p-[1px] outline outline-2 outline-offset-1 outline-blue-900 duration-200 hover:scale-110`}
            >
              <span
                style={{ backgroundColor: item }}
                className="block aspect-square w-full rounded-full border"
              ></span>
            </div>
          ))}
        </div>
        <AddToFav id={id} inFav={inFav} />
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
