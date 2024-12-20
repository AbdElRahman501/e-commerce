"use client";
import React, { useEffect, useMemo } from "react";
import { Sorting } from ".";
import { CategoryCount, CollectionCount } from "@/types";
import { createUrl } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterContainer = ({
  allColors,
  allSizes,
  collectionsWithCategories,
}: {
  collectionsWithCategories: CollectionCount[];
  allColors: string[];
  allSizes: string[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const genderFilter = searchParams?.get("gf") || "";
  const collectionFilter = searchParams?.get("cl") || "";
  const categoryFilter = searchParams?.get("ctf")?.length
    ? searchParams?.get("ctf")?.toLowerCase()?.trim()?.split(",") || []
    : [];
  const sizeFilter = searchParams?.get("szf")?.length
    ? searchParams?.get("szf")?.toLowerCase()?.trim()?.split(",") || []
    : [];

  const colorFilter = searchParams?.get("clf")?.length
    ? searchParams?.get("clf")?.toLowerCase()?.trim()?.split(",") || []
    : [];

  const minPriceParam = searchParams?.get("minP") || "";
  const minPrice = minPriceParam ? parseInt(minPriceParam) : 0;
  const maxPriceParam = searchParams?.get("maxP") || "";
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : 1000;
  const [submitChanges, setSubmitChanges] = React.useState<boolean>(false);

  const [selectedGenders, setSelectedGenders] =
    React.useState<string>(genderFilter);
  const [selectedCategories, setSelectedCategories] =
    React.useState<string[]>(categoryFilter);
  const [selectedCollection, setSelectedCollection] =
    React.useState<string>(collectionFilter);
  const [selectedSizes, setSelectedSizes] =
    React.useState<string[]>(sizeFilter);
  const [selectedColors, setSelectedColors] =
    React.useState<string[]>(colorFilter);
  const [minPriceState, setMinPriceState] = React.useState<number>(minPrice);
  const [maxPriceState, setMaxPriceState] = React.useState<number>(maxPrice);
  const [changed, setChanged] = React.useState<boolean>(false);

  const categories = useMemo(
    () =>
      collectionsWithCategories.find((c) => c.name === selectedCollection)
        ?.categories || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCollection],
  );

  function submitHandler() {
    setSubmitChanges(true);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("gf", selectedGenders);
    newSearchParams.set("ctf", selectedCategories.join(","));
    newSearchParams.set("cl", selectedCollection);
    newSearchParams.set("szf", selectedSizes.join(","));
    newSearchParams.set("clf", selectedColors.join(","));
    newSearchParams.set("minP", minPriceState.toString());
    newSearchParams.set("maxP", maxPriceState.toString());
    newSearchParams.set("ft", "false");
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  }

  useEffect(() => {
    setSelectedGenders(genderFilter);
    setSelectedCollection(collectionFilter);
    setSelectedCategories(categoryFilter);
    setSelectedSizes(sizeFilter);
    setSelectedColors(colorFilter);
    setMinPriceState(minPrice);
    setMaxPriceState(maxPrice);

    if (!submitChanges && searchParams?.get("ft") === "false") {
      submitHandler();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function onReset() {
    setChanged(false);
    router.replace(pathname, { scroll: false });
    setSelectedGenders("");
    setSelectedCategories([]);
    setSelectedCollection("");
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPriceState(0);
    setMaxPriceState(1000);
  }
  useEffect(() => {
    if (
      selectedGenders ||
      selectedCategories.length ||
      selectedCollection ||
      selectedSizes.length ||
      selectedColors.length ||
      minPriceState !== 0 ||
      maxPriceState !== 1000
    ) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [
    selectedGenders,
    selectedCategories,
    selectedCollection,
    selectedSizes,
    selectedColors,
    minPriceState,
    maxPriceState,
  ]);
  return (
    <div
      style={{ bottom: searchParams?.get("ft") === "true" ? "0" : "-100vh" }}
      className=" scroll-bar-hidden fixed  left-0  z-20 flex h-full max-h-[calc(100dvh-9.5rem)] w-full flex-col gap-7 overflow-y-auto bg-white px-5 pt-10 outline-1 outline-offset-1 outline-gray-300 duration-500 ease-in-out dark:bg-dark_bg dark:outline-gray-500 md:static md:max-h-none md:w-1/4 md:rounded-3xl md:outline 2xl:w-1/5"
    >
      <Sorting classNames="  min-h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white flex md:hidden" />
      <div className="relative flex h-14 min-h-14 w-full flex-grow-0 rounded-full border md:max-w-xs">
        <div
          className={`${selectedGenders === "0" ? "left-[50%] border bg-primary_color" : selectedGenders === "1" ? "left-0 border bg-primary_color" : ""}  absolute top-0  -z-10 m-[2px] h-[calc(100%-4px)] w-[calc(50%-4px)] rounded-full  text-center   text-primary_color duration-200`}
        ></div>
        <button
          onClick={() => {
            setSubmitChanges(false);
            setSelectedGenders(selectedGenders === "1" ? "" : "1");
          }}
          className={`${selectedGenders === "1" ? "text-white" : selectedGenders ? "text-gray-400 dark:text-gray-700" : ""} m-[2px] flex h-[calc(100%-4px)] w-[calc(50%-4px)]  items-center justify-center text-center  `}
        >
          <span>men</span>
        </button>
        <button
          onClick={() => {
            setSubmitChanges(false);
            setSelectedGenders(selectedGenders === "0" ? "" : "0");
          }}
          className={`${selectedGenders === "0" ? "text-white" : selectedGenders ? "text-gray-400 dark:text-gray-700" : ""} m-[2px] flex h-[calc(100%-4px)] w-[calc(50%-4px)] items-center justify-center text-center  `}
        >
          <span>women</span>
        </button>
      </div>
      {collectionsWithCategories.length > 0 && (
        <div className="flex flex-col gap-3">
          <h1>Collections</h1>
          <div className="flex flex-wrap gap-1">
            {collectionsWithCategories.map((item, index) => (
              <button
                onClick={() => {
                  setSubmitChanges(false);
                  setSelectedCollection(
                    selectedCollection === item.name ? "" : item.name,
                  );
                  setSelectedCategories([]);
                }}
                key={index}
                className={`${selectedCollection === item.name ? " border-black dark:border-white " : " border-gray-200 dark:border-gray-700 "} rounded-xl border-2 p-2 px-4 text-sm duration-200 hover:scale-105 hover:border-black dark:hover:border-white`}
              >
                <span>{item.name + " (" + item.count + ")"}</span>
              </button>
            ))}
          </div>
        </div>
      )}{" "}
      {categories.length > 0 && (
        <div className="flex flex-col gap-3">
          <h1>Categories</h1>
          <div className="flex flex-wrap gap-1">
            {categories.map((item, index) => {
              const selected = selectedCategories.includes(
                item.name.trim().toLowerCase(),
              );
              return (
                <button
                  onClick={() => {
                    setSubmitChanges(false);
                    setSelectedCategories(
                      selected
                        ? selectedCategories.filter(
                            (category) => category !== item.name,
                          )
                        : [...selectedCategories, item.name],
                    );
                  }}
                  key={index}
                  className={`${selected ? " border-black dark:border-white " : " border-gray-200 dark:border-gray-700 "} rounded-xl border-2 p-2 px-4 text-sm duration-200 hover:scale-105 hover:border-black dark:hover:border-white`}
                >
                  <span>{item.name + " (" + item.count + ")"}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}{" "}
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
                  setSubmitChanges(false);
                  setSelectedSizes(
                    selected
                      ? selectedSizes.filter((size) => size !== item)
                      : [...selectedSizes, item],
                  );
                }}
                key={index}
                className={`${selected ? " border-black dark:border-white " : " border-gray-200 dark:border-gray-700 "} rounded-xl border-2 p-2 px-4 text-sm duration-200 hover:scale-105 hover:border-black dark:hover:border-white`}
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
                  setSubmitChanges(false);
                  setSelectedColors(
                    selected
                      ? selectedColors.filter((color) => color !== item)
                      : [...selectedColors, item],
                  );
                }}
                className={`${selected ? " border-black dark:border-white " : "border-transparent"} rounded-full border-2  p-[1px] text-sm duration-200 hover:scale-105 hover:border-black dark:hover:border-white`}
              >
                <span
                  style={{ backgroundColor: item }}
                  className="block h-7 w-7 rounded-full border border-gray-300"
                ></span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1>Prices</h1>
        <div className="flex w-full items-center gap-1">
          <input
            key={minPrice}
            type="number"
            placeholder="Min"
            name="min"
            value={minPriceState}
            onChange={(e) => setMinPriceState(Number(e.target.value))}
            className="flex h-10 w-full items-center justify-center rounded-xl border border-gray-200  bg-transparent  text-center text-sm text-primary_color dark:border-gray-700  dark:text-white"
          />
          <span>to</span>
          <input
            key={maxPrice}
            type="number"
            name="max"
            placeholder="max"
            value={maxPriceState}
            onChange={(e) => setMaxPriceState(Number(e.target.value))}
            className="flex h-10 w-full items-center justify-center rounded-xl border border-gray-200  bg-transparent text-center text-sm text-primary_color dark:border-gray-700  dark:text-white"
          />
          <input type="submit" className="hidden" />
        </div>
      </div>
      <div className="sticky bottom-0 flex  flex-col gap-1 bg-primary_bg pb-4 dark:bg-dark_bg">
        <button
          type="button"
          onClick={submitHandler}
          className="group mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-primary_color px-4 py-2 text-center text-white hover:bg-white hover:text-black"
        >
          <p className="duration-500 group-hover:scale-110">Apply Filters</p>
        </button>
        {changed && (
          <button
            type="button"
            onClick={onReset}
            className="group mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-lg border-2 border-black px-4 py-2 text-center text-black dark:border-white dark:text-white"
          >
            <p className="duration-500 group-hover:scale-110">Reset</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterContainer;
