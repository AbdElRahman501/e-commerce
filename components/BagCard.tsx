import { CartProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { StoreContext } from "./StoreContext";

type Props = CartProduct & {
  readonly?: boolean;
  removable?: boolean;
};

const BagCard = ({
  images,
  title,
  price,
  amount,
  selectedColor,
  selectedSize,
  id,
  readonly,
  removable,
}: Props) => {
  const { setCart } = React.useContext(StoreContext);

  const removeItem = () => {
    setCart((prev) =>
      prev.filter((item) => {
        const matchItem =
          item.productId === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize;

        if (matchItem) {
          return false;
        }
        return true;
      }),
    );
  };
  return (
    <div className="relative flex w-full gap-5 border-b pb-2 ">
      <Link
        href={`/product/${id}`}
        style={{ pointerEvents: readonly ? "none" : "auto" }}
        className="aspect-card relative h-28 overflow-hidden rounded-2xl border md:h-32"
      >
        <Image
          src={images[selectedColor]}
          alt="jacket"
          fill
          sizes="100%"
          className="duration-300 hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <h2 className="font-regular w-3/4 text-sm text-primary_color dark:text-gray-300 md:text-base  ">
          {title}
        </h2>
        <h2 className="text-base font-bold md:text-lg">{price} EGP</h2>
        <div className="flex  gap-2">
          {readonly ? (
            <div
              className={`w-8 scale-110 rounded-full p-1 outline outline-2 outline-offset-1 outline-blue-900 duration-200 hover:scale-110 dark:outline-blue-400`}
            >
              <span
                style={{ backgroundColor: selectedColor }}
                className="block aspect-square w-full rounded-full border"
              ></span>
            </div>
          ) : (
            <div className="flex h-8 items-center justify-between overflow-hidden rounded-xl border border-primary_color dark:border-white ">
              <div className={` w-12 rounded-full px-2  duration-200`}>
                <span
                  style={{ backgroundColor: selectedColor }}
                  className="block h-5 w-5 rounded-full border border-gray-400"
                ></span>
              </div>

              <button
                type="button"
                className="h-full w-6 flex-1 text-2xl hover:bg-primary_color hover:text-white"
              >
                <Image
                  src={"/icons/arrow-down.svg"}
                  width={24}
                  height={24}
                  alt={"sort icon"}
                  className="hover:invert dark:invert"
                />
              </button>
            </div>
          )}
          <div className="flex h-8 items-center justify-between overflow-hidden rounded-xl border border-primary_color dark:border-white ">
            <p className="w-12 text-center">{selectedSize}</p>
            {!readonly && (
              <button
                type="button"
                className="h-full w-6 flex-1 text-2xl hover:bg-primary_color hover:text-white"
              >
                <Image
                  src={"/icons/arrow-down.svg"}
                  width={24}
                  height={24}
                  alt={"sort icon"}
                  className="hover:invert dark:invert"
                />
              </button>
            )}
          </div>
          {readonly ? (
            <div className="flex aspect-square h-8 items-center justify-between overflow-hidden rounded-xl border border-primary_color dark:border-white ">
              <span className="w-full text-center">{amount}</span>
            </div>
          ) : (
            <div className="flex h-8 items-center justify-between overflow-hidden rounded-xl border border-primary_color dark:border-white ">
              <button
                type="button"
                className="w-6 flex-1 text-2xl enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25 "
              >
                <span>&#8722;</span>
              </button>
              <input
                type="number"
                name="amount"
                id="amount"
                min={1}
                value={amount}
                readOnly
                step={1}
                className="w-6 bg-transparent text-center outline-none "
              />
              <button
                type="button"
                className="w-6 flex-1 text-2xl hover:bg-primary_color hover:text-white"
              >
                <span>&#43;</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {!removable && (
        <button
          onClick={removeItem}
          type="button"
          className="absolute right-0 top-0"
        >
          <div className="relative h-5 w-5">
            <Image
              src="/icons/remove.svg"
              alt="remove"
              fill
              sizes="100%"
              className="cursor-pointer duration-300 hover:scale-110"
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default BagCard;
