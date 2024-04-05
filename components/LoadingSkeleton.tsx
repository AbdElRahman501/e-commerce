// components/LoadingSkeleton.tsx
import { CartItem } from "@/types";
import React from "react";
import LogoIcon from "./icons/LogoIcon";

export const ProductSkeleton: React.FC = () => {
  return (
    <section className="p-5 lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <div className="title flex h-8 w-full items-center justify-between">
          <div className="h-10 w-[40%] animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-10 w-[25%] animate-pulse rounded-full bg-gray-300"></div>
        </div>
        <div className="scroll-bar-hidden overflow-x-scroll md:overflow-hidden">
          <div className="grid-container grid w-full gap-4 md:grid-cols-4 lg:gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex animate-pulse flex-col gap-2">
                <div className="aspect-card rounded-3xl bg-gray-300"></div>
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
        <div key={index} className="relative flex w-full gap-5 border-b pb-2 ">
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
export const FilterSkeleton = () => {
  return (
    <div className="scroll-bar-hidden h-{75vh}  fixed bottom-[-100vh] left-0  z-20  flex max-h-[calc(100dvh-9.5rem)] w-full animate-pulse flex-col gap-7 overflow-y-auto bg-gray-300 px-5 py-10 outline-1 outline-offset-1 outline-gray-300 duration-500 ease-in-out dark:outline-gray-500 md:static md:max-h-none md:w-1/4 md:rounded-3xl md:outline 2xl:w-1/5"></div>
  );
};
export const LoadingLogo = () => {
  return (
    <div className=" flex min-h-screen w-full items-center justify-center ">
      <LogoIcon className="h-16 w-16 animate-pulse md:h-20 md:w-20" />
    </div>
  );
};
