import { CartProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { StoreContext } from "./StoreContext";
import AmountButton from "./AmountButton";

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
  colors,
  sizes,
  salePrice,
}: Props) => {
  const { cart, setCart } = React.useContext(StoreContext);
  const sameProductColors = cart
    .map((item) => {
      if (item.productId === id && item.selectedSize === selectedSize) {
        return item.selectedColor;
      } else false;
    })
    .filter(Boolean);
  const sameProductSizes = cart
    .map((item) => {
      if (item.productId === id && item.selectedColor === selectedColor) {
        return item.selectedSize;
      } else false;
    })
    .filter(Boolean);
  const [colorDropdown, setColorDropdown] = React.useState(false);
  const [sizeDropdown, setSizeDropdown] = React.useState(false);

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

  const updateProductColor = (newColor: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.productId === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, selectedColor: newColor };
        }
        return item;
      }),
    );
    setColorDropdown(false);
  };
  const updateProductSize = (newSize: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.productId === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, selectedSize: newSize };
        }
        return item;
      }),
    );
    setSizeDropdown(false);
  };

  const setAmount = (newAmount: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.productId === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, amount: newAmount };
        }
        return item;
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
          src={images[selectedColor][0]}
          alt="jacket"
          fill
          objectFit="cover"
          sizes="100%"
          className="duration-300 hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <h2 className="font-regular w-3/4 text-sm text-primary_color dark:text-gray-300 md:text-base  ">
          {title}
        </h2>
        {salePrice ? (
          <div className="flex flex-col ">
            <p className="text-xs text-gray-500 line-through">{price} EGP</p>
            <p className=" text-sm font-bold md:text-base ">{salePrice} EGP</p>
          </div>
        ) : (
          <p className="text-sm font-bold  md:text-base ">{price} EGP</p>
        )}
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
            <div className="relative flex h-8 items-center justify-between  rounded-xl outline outline-1 ">
              <div className={` w-12 rounded-full px-2  duration-200`}>
                <span
                  style={{ backgroundColor: selectedColor }}
                  className="block h-5 w-5 rounded-full border border-gray-400"
                ></span>
              </div>

              <button
                type="button"
                onClick={() => setColorDropdown((prev) => !prev)}
                className="h-full w-6 flex-1 rounded-r-xl text-2xl hover:bg-primary_color hover:text-white"
              >
                <Image
                  src={"/icons/arrow-down.svg"}
                  width={24}
                  height={24}
                  alt={"sort icon"}
                  className={` ${colorDropdown ? "rotate-180" : ""} duration-300 hover:invert dark:invert`}
                />
              </button>
              <div
                className={` ${colorDropdown ? "max-h-40 outline outline-1 " : "max-h-0"} absolute left-0 top-8 z-20 flex w-full  flex-col gap-2 overflow-y-auto rounded-md bg-white duration-300 dark:bg-primary_color`}
              >
                {colors
                  .filter((item) => !sameProductColors.includes(item))
                  .map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => updateProductColor(item)}
                      className={` w-12 rounded-full px-2  duration-200 hover:scale-110 `}
                    >
                      <span
                        style={{ backgroundColor: item }}
                        className="block h-5 w-5 rounded-full border border-gray-400"
                      ></span>
                    </button>
                  ))}
              </div>
            </div>
          )}
          <div className="relative flex h-8 items-center justify-between rounded-xl outline outline-1 ">
            <p className="w-12 text-center">{selectedSize}</p>
            {!readonly && (
              <button
                type="button"
                onClick={() => setSizeDropdown((prev) => !prev)}
                className="h-full w-6 flex-1 rounded-r-xl text-2xl hover:bg-primary_color hover:text-white"
              >
                <Image
                  src={"/icons/arrow-down.svg"}
                  width={24}
                  height={24}
                  alt={"sort icon"}
                  className={` ${sizeDropdown ? "rotate-180" : ""} duration-300 hover:invert dark:invert`}
                />
              </button>
            )}
            <div
              className={` ${sizeDropdown ? "max-h-40 outline outline-1" : "max-h-0"} absolute left-0 top-8 z-20 flex w-full  flex-col gap-2 overflow-y-auto rounded-md bg-white duration-300 dark:bg-primary_color`}
            >
              {sizes
                .filter((item) => !sameProductSizes.includes(item))
                .map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => updateProductSize(item)}
                    className="w-12 text-center"
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
          {readonly ? (
            <div className="flex aspect-square h-8 items-center justify-between overflow-hidden rounded-xl border border-primary_color dark:border-white ">
              <span className="w-full text-center">{amount}</span>
            </div>
          ) : (
            <AmountButton
              width="w-6"
              className="h-8 rounded-xl"
              amount={amount}
              setAmount={setAmount}
            />
          )}
        </div>
      </div>
      {!readonly && (
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
