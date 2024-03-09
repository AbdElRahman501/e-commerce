// components/LoadingSkeleton.tsx
import { CartItem } from "@/types";
import Image from "next/image";
import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <section className="p-5 lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <div className="title flex h-8 w-full items-center justify-between">
          <div className="h-8 w-[40%] animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-8 w-[20%] animate-pulse rounded-md bg-gray-300"></div>
        </div>
        <div className="scroll-bar-hidden overflow-x-scroll md:overflow-hidden">
          <div className="grid-container grid w-full gap-4 md:grid-cols-4 lg:gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex animate-pulse flex-col gap-2">
                <div className="aspect-card rounded-lg bg-gray-300"></div>
                <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                <div className="h-4 w-1/2 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export const CartSkeleton = ({ array }: { array: CartItem[] }) => {
  return (
    <div className=" flex w-full flex-col gap-5 md:max-w-lg ">
      {array.map((_, index) => (
        <div className="relative flex w-full gap-5 border-b pb-2 ">
          <div className="aspect-card h-28 animate-pulse rounded-2xl bg-gray-300"></div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="h-8 w-[40%] animate-pulse rounded-md bg-gray-300"></div>
            <div className="h-8 w-[40%] animate-pulse rounded-md bg-gray-300"></div>
            <div className="flex  gap-2">
              <div className="h-8  w-16 animate-pulse rounded-xl bg-gray-300"></div>
              <div className="h-8  w-16 animate-pulse rounded-xl bg-gray-300"></div>
              <div className="h-8  w-16 animate-pulse rounded-xl bg-gray-300"></div>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-6 w-5 animate-pulse rounded-md bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};
export const LoadingLogo = () => {
  return (
    <div className=" flex min-h-screen w-full items-center justify-center ">
      <Image
        src="/logo.svg"
        alt="logo"
        width={150}
        height={100}
        className="h-8 animate-pulse invert-0 dark:invert-0 md:invert"
      />
    </div>
  );
};
