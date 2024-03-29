"use client";
import React from "react";
import { Sorting } from ".";
import { CategoryCount } from "@/types";
import { createUrl } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterContainer = ({
  allColors,
  allSizes,
  categories,
}: {
  allColors: string[];
  allSizes: string[];
  categories: CategoryCount[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const genderFilter = searchParams?.get("gf") || "";
  const categoryFilter = React.useMemo(() => {
    return searchParams?.get("ctf")?.length
      ? searchParams?.get("ctf")?.split(",") || []
      : [];
  }, [searchParams]);
  const sizeFilter = React.useMemo(() => {
    return searchParams?.get("szf")?.length
      ? searchParams?.get("szf")?.split(",") || []
      : [];
  }, [searchParams]);

  const colorFilter = React.useMemo(() => {
    return searchParams?.get("clf")?.length
      ? searchParams?.get("clf")?.split(",") || []
      : [];
  }, [searchParams]);

  const minPriceParam = searchParams?.get("minP") || "";
  const minPrice = minPriceParam ? parseInt(minPriceParam) : 0;
  const maxPriceParam = searchParams?.get("maxP") || "";
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : 1000;

  const [selectedGenders, setSelectedGenders] =
    React.useState<string>(genderFilter);
  const [selectedCategories, setSelectedCategories] =
    React.useState<string[]>(categoryFilter);
  const [selectedSizes, setSelectedSizes] =
    React.useState<string[]>(sizeFilter);
  const [selectedColors, setSelectedColors] =
    React.useState<string[]>(colorFilter);

  function addParam(key: string, value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value.toString().toLowerCase().trim());
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const min = (form.elements.namedItem("min") as HTMLInputElement)?.value;
    const max = (form.elements.namedItem("max") as HTMLInputElement)?.value;

    const newParams = new URLSearchParams(searchParams.toString());
    if (min) {
      newParams.set("minP", min);
    } else {
      newParams.delete("minP");
    }
    if (max) {
      newParams.set("maxP", max);
    } else {
      newParams.delete("maxP");
    }

    router.push(createUrl(pathname, newParams), { scroll: false });
  }

  function onReset() {
    router.replace(pathname, { scroll: false });
    setSelectedGenders("");
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  }
  return (
    <div
      style={{ bottom: searchParams?.get("ft") === "true" ? "0" : "-100vh" }}
      className="scroll-bar-hidden fixed  left-0  z-20 flex h-fit max-h-[calc(100dvh-9.5rem)] w-full flex-col gap-7 overflow-y-auto bg-white px-5 py-10 outline-1 outline-offset-1 outline-gray-300 duration-500 ease-in-out dark:bg-primary_bg dark:outline-gray-500 md:static md:max-h-none md:w-1/4 md:rounded-3xl md:outline 2xl:w-1/5"
    >
      <Sorting classNames="  min-h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white flex md:hidden" />
      <div className="relative flex h-14 min-h-14 w-full flex-grow-0 rounded-full border md:max-w-xs">
        <div
          className={`${selectedGenders === "0" ? "left-[50%] border bg-primary_color" : selectedGenders === "1" ? "left-0 border bg-primary_color" : ""} absolute top-0  -z-10 m-[2px] h-[calc(100%-4px)] w-[calc(50%-4px)] rounded-full  text-center   text-primary_color duration-200`}
        ></div>
        <button
          onClick={() => {
            addParam("gf", selectedGenders === "1" ? "" : "1");
            setSelectedGenders(selectedGenders === "1" ? "" : "1");
          }}
          className={`${selectedGenders === "1" ? "text-white" : "text-primary_color"} m-[2px] flex h-[calc(100%-4px)] w-[calc(50%-4px)]  items-center justify-center text-center  `}
        >
          <span>men</span>
        </button>
        <button
          onClick={() => {
            addParam("gf", selectedGenders === "0" ? "" : "0");
            setSelectedGenders(selectedGenders === "0" ? "" : "0");
          }}
          className={`${selectedGenders === "0" ? "text-white" : "text-primary_color"} m-[2px] flex h-[calc(100%-4px)] w-[calc(50%-4px)] items-center justify-center text-center  `}
        >
          <span>women</span>
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <h1>Categories</h1>
        <div className="flex flex-wrap gap-1">
          {categories.map((item, index) => {
            const selected = selectedCategories.includes(
              item.name.toLowerCase(),
            );
            return (
              <button
                onClick={() => {
                  addParam(
                    "ctf",
                    selected
                      ? selectedCategories
                          .filter((category) => category !== item.name)
                          .join(",")
                      : [...selectedCategories, item.name].join(","),
                  );
                  setSelectedCategories(
                    selected
                      ? selectedCategories.filter(
                          (category) => category !== item.name,
                        )
                      : [...selectedCategories, item.name],
                  );
                }}
                key={index}
                className={`${selected ? " outline-2 outline-black dark:outline-white " : " outline-1 outline-gray-200 dark:outline-gray-700 "} rounded-xl p-2 px-4 text-sm outline duration-200 hover:scale-105 hover:outline-black dark:hover:outline-white`}

                // className={`${selected ? "bg-primary_color text-white" : ""} flex h-10 items-center justify-center rounded-full border border-primary_bg px-8 py-1 text-sm text-primary_color duration-300 dark:border-white dark:text-white`}
              >
                <span>{item.name + " (" + item.count + ")"}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1>Sizes</h1>
        <div className="flex flex-wrap gap-1">
          {allSizes.map((item, index) => {
            const selected = selectedSizes
              .map((size) => size.toLowerCase())
              .includes(item.toLowerCase());
            return (
              <button
                onClick={() => {
                  addParam(
                    "szf",
                    selected
                      ? selectedSizes.filter((size) => size !== item).join(",")
                      : [...selectedSizes, item].join(","),
                  );
                  setSelectedSizes(
                    selected
                      ? selectedSizes.filter((size) => size !== item)
                      : [...selectedSizes, item],
                  );
                }}
                key={index}
                className={`${selected ? " outline-2 outline-black dark:outline-white " : " outline-1 outline-gray-200 dark:outline-gray-700 "} rounded-xl p-2 px-4 outline  duration-200 hover:scale-110 hover:outline-black dark:hover:outline-white`}

                // className={`${selected ? "bg-primary_color text-white" : ""} flex aspect-square h-10 items-center justify-center rounded-xl border border-primary_bg py-1 text-sm text-primary_color dark:border-white dark:text-white`}
              >
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1>Colors</h1>
        <div className="flex flex-wrap gap-3">
          {allColors.map((item, index) => {
            const selected = selectedColors.includes(item);
            return (
              <button
                key={index}
                onClick={() => {
                  addParam(
                    "clf",
                    selected
                      ? selectedColors
                          .filter((color) => color !== item)
                          .join(",")
                      : [...selectedColors, item].join(","),
                  );
                  setSelectedColors(
                    selected
                      ? selectedColors.filter((color) => color !== item)
                      : [...selectedColors, item],
                  );
                }}
                className={`${selected ? "outline-2 outline-black dark:outline-white " : "outline-1 outline-transparent"} rounded-full outline  outline-offset-2   duration-200 hover:scale-110`}

                // className={`${selected ? "scale-110  outline  outline-2 outline-blue-900 dark:outline-blue-400" : "border-transparent"} h-8 w-8 rounded-full p-[1px] outline-offset-1 duration-200 hover:scale-110`}
              >
                <span
                  style={{ backgroundColor: item }}
                  // className="block aspect-square w-full rounded-full border"
                  className="block h-7 w-7 rounded-full border border-gray-300"
                ></span>
              </button>
            );
          })}
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <h1>Prices</h1>
        <div className="flex w-full items-center gap-1">
          <input
            key={minPrice}
            type="number"
            placeholder="Min"
            name="min"
            defaultValue={minPrice}
            className="flex h-10 w-full items-center justify-center rounded-xl border border-primary_bg bg-transparent text-center text-sm text-primary_color dark:border-white dark:text-white"
          />
          <span>to</span>
          <input
            key={maxPrice}
            type="number"
            name="max"
            placeholder="max"
            defaultValue={maxPrice}
            className="flex h-10 w-full items-center justify-center rounded-xl border border-primary_bg bg-transparent text-center text-sm text-primary_color dark:border-white dark:text-white"
          />
          <input type="submit" className="hidden" />
        </div>
      </form>

      <button
        type="button"
        onClick={onReset}
        className="group mt-2 min-h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
      >
        <p className="duration-500 group-hover:scale-110">Reset</p>
      </button>
    </div>
  );
};

export default FilterContainer;
