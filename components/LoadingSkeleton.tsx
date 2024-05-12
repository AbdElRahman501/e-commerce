import React from "react";
import LogoIcon from "./icons/LogoIcon";
import { CartItem } from "@/types";

export const LoadingLogo = () => {
  return (
    <div className=" flex min-h-screen w-full items-center justify-center ">
      <LogoIcon className="h-16 w-16 animate-pulse fill-black md:h-20 md:w-20" />
    </div>
  );
};

export const ProductSkeleton: React.FC = () => {
  return (
    <section className="mx-auto max-w-8xl p-5  text-transparent lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <div className={`title flex items-center justify-between`}>
          <h1 className="min-w-52 animate-pulse rounded-md bg-gray-300 text-3xl font-bold uppercase md:text-4xl ">
            &nbsp;
          </h1>
          <div
            className={
              "group flex items-center justify-between  gap-2 rounded-full text-sm md:text-base"
            }
          >
            <p className="w-20 animate-pulse text-nowrap rounded-md bg-gray-300 uppercase group-hover:underline">
              &nbsp;
            </p>
            <div
              className={` flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-gray-300 duration-300 group-hover:bg-black group-hover:text-white dark:bg-primary_color dark:group-hover:bg-gray-200 dark:group-hover:text-black `}
            >
              <div className="h-4 w-4 -rotate-[135deg] fill-current  "></div>
            </div>
          </div>
        </div>
        <div className="scroll-bar-hidden overflow-x-scroll md:overflow-hidden">
          <div className="scroll-bar-hidden overflow-x-scroll ">
            <div className="flex w-full gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="relative  min-w-[306px] flex-1 snap-x snap-mandatory snap-start flex-col gap-4 "
                >
                  <div className="relative">
                    <div className="relative block">
                      <div className="aspect-card group relative animate-pulse overflow-hidden rounded-3xl bg-gray-300 "></div>
                    </div>
                    <div className="absolute bottom-2  right-2 rounded-full bg-white p-2 text-black ">
                      <div className="h-5 w-5"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-4 text-center">
                    <p className="line-clamp-2  w-full animate-pulse rounded-md bg-gray-300 text-sm font-bold">
                      &nbsp;
                    </p>
                    <div className="relative flex items-center justify-center pt-2">
                      <p className="w-20 animate-pulse rounded-md bg-gray-300 text-sm md:text-base">
                        &nbsp;
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      {[...Array(3)].map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          aria-label={"Select color " + item}
                          className="max-w-6 flex-1 animate-pulse rounded-full border-transparent bg-gray-300 p-[1px] duration-200 hover:scale-110"
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
              ))}
            </div>
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
        <div key={index} className="relative flex w-full gap-5  pb-2 ">
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
    <div className="scroll-bar-hidden h-{75vh}  fixed bottom-[-100vh] left-0  z-20  flex max-h-[calc(100dvh-9.5rem)] w-full animate-pulse flex-col gap-7 overflow-y-auto bg-gray-300 px-5 py-10  md:static md:max-h-none md:w-1/4 md:rounded-3xl 2xl:w-1/5"></div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-8xl flex-col text-transparent sm:flex-row sm:p-5 md:gap-4 lg:px-20">
      <div className="relative h-full w-full flex-1 gap-2 sm:w-4/6 ">
        <div
          className={` absolute left-1 top-0 z-10 flex h-full w-10 items-center justify-center text-3xl sm:hidden `}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
            <div className="h-10 w-10"></div>
          </div>
        </div>

        <div className="scroll-bar-hidden images-container  relative h-full w-full snap-x snap-mandatory overflow-scroll max-sm:!flex sm:grid sm:gap-2 sm:overflow-hidden">
          {[...Array(4)].map((item, index) => (
            <div
              key={index}
              className={`area-${index + 1}  aspect-card relative min-w-[100vw] snap-center overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 sm:min-w-full sm:rounded-3xl`}
            ></div>
          ))}
        </div>
        <div
          className={` absolute right-1 top-0 z-10 flex h-full w-10 items-center justify-center text-3xl sm:hidden`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
            <div className="h-10 w-10"></div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 flex w-full justify-center text-white  sm:hidden">
          <div className="flex space-x-1">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full   bg-gray-500`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="z-10 flex w-full flex-col gap-3 p-5 sm:w-5/12 md:col-span-2 md:py-0">
        <div className="nav group w-fit text-xs">
          <p className="inline-block animate-pulse rounded-md bg-gray-300 ">
            shop
          </p>
          <div className="inline-block">
            <span className="mx-1 inline-block text-base text-gray-500">
              &#8250;
            </span>
            <div className=" inline-block animate-pulse rounded-md bg-gray-300">
              anything
            </div>
          </div>
        </div>
        <h6 className="animate-pulse rounded-md bg-gray-300 ">title</h6>

        <p className="w-1/2 animate-pulse  rounded-md bg-gray-300 text-sm ">
          name
        </p>
        <p className=" animate-pulse  rounded-md bg-gray-300 font-bold md:text-base ">
          1000 EGP
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-sm ">
            <span className="animate-pulse rounded-xl bg-gray-300">Color:</span>{" "}
            <strong className="animate-pulse rounded-xl bg-gray-300">
              Color
            </strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL"].map((item, index) => (
              <div
                key={index}
                className="animate-pulse rounded-xl bg-gray-300 p-2 px-4 text-sm "
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm ">
            <span className="animate-pulse rounded-xl bg-gray-300">Color:</span>{" "}
            <strong className="animate-pulse rounded-xl bg-gray-300">
              Color
            </strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {["red", "green", "blue", "yellow"].map((item, index) => (
              <div
                key={index}
                className="animate-pulse rounded-full bg-gray-300  "
              >
                <span className="block h-7 w-7 rounded-full"></span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm ">
            <span className="animate-pulse rounded-xl bg-gray-300">Color:</span>{" "}
            <strong className="animate-pulse rounded-xl bg-gray-300">
              Color
            </strong>
          </p>
        </div>
        <div className="h-10  w-1/2 animate-pulse rounded-md bg-gray-300"></div>
        <div
          className={` mt-3 flex max-w-md items-center justify-between gap-3`}
        >
          <div className=" flex h-14 w-full animate-pulse items-center gap-3 rounded-full bg-gray-300  p-1  ">
            <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-white text-3xl ">
              <div className="w-10"></div>
            </div>
            <p className="w-full text-center uppercase  md:text-lg">
              Go See In Cart
            </p>
          </div>
          <div className="flex aspect-square h-14 w-14 animate-pulse items-center  justify-center rounded-full bg-gray-300  py-1 text-lg ">
            <div className="w-8"></div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          {["question1", "question2", "question3"].map((x) => (
            <div key={x} className="-200 px-2 ">
              <div className="group flex  items-center justify-between gap-3 pb-3 ">
                <h1 className=" question w-1/2 animate-pulse rounded-md bg-gray-300 text-base font-bold">
                  question
                </h1>
                <div className="rounded-full bg-gray-200 p-1 ">
                  <div className="aspect-square h-4 w-4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
