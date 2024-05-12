"use client";
import { createUrl, formatPrice } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const FilterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchQuery = searchParams?.get("q") || "";
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
  const gender =
    parseInt(genderFilter) === 1
      ? "Men"
      : parseInt(genderFilter) === 0
        ? "Women"
        : "";

  const changed = React.useMemo(() => {
    return (
      gender ||
      categoryFilter.length ||
      sizeFilter.length ||
      colorFilter.length ||
      minPrice !== 0 ||
      maxPrice !== 1000
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function updateParam(key: string, value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  }

  return (
    <div className="scroll-bar-hidden flex gap-3 overflow-scroll px-5 pt-5 md:hidden md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {changed && (
        <div
          onClick={() => router.replace(pathname, { scroll: false })}
          className=" cursor-pointer rounded-xl bg-primary_color  px-4 py-2 text-white dark:bg-white dark:text-black "
        >
          Reset
        </div>
      )}
      {searchQuery && (
        <div className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700">
          <span>{searchQuery}</span>
          <span
            onClick={() => updateParam("q", "")}
            className=" cursor-pointer px-4 text-sm "
          >
            &#10005;
          </span>
        </div>
      )}
      {gender && (
        <div className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700">
          <span>{gender}</span>
          <span
            onClick={() => updateParam("gf", "")}
            className=" cursor-pointer px-4 text-sm "
          >
            &#10005;
          </span>
        </div>
      )}
      {categoryFilter.map((category, index) => (
        <div
          key={index}
          className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700"
        >
          <span>{category}</span>
          <span
            onClick={() =>
              updateParam(
                "ctf",
                categoryFilter.filter((c) => c !== category).join(","),
              )
            }
            className=" cursor-pointer px-4 text-sm "
          >
            &#10005;
          </span>
        </div>
      ))}

      {sizeFilter.map((size, index) => (
        <div
          key={index}
          className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700"
        >
          <span>{size}</span>
          <span
            onClick={() =>
              updateParam("szf", sizeFilter.filter((s) => s !== size).join(","))
            }
            className=" cursor-pointer px-4 text-sm "
          >
            &#10005;
          </span>
        </div>
      ))}

      {colorFilter.map((color, index) => (
        <div
          key={index}
          className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700"
        >
          <span>{color}</span>
          <span
            onClick={() =>
              updateParam(
                "clf",
                colorFilter.filter((c) => c !== color).join(","),
              )
            }
            className=" cursor-pointer px-4 text-sm "
          >
            &#10005;
          </span>
        </div>
      ))}
      {minPrice !== 0 && (
        <div className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700">
          <span>Min Price: {formatPrice(minPrice, "EGP")}</span>
          <span
            onClick={() => updateParam("minP", "")}
            className=" cursor-pointer px-4 text-sm "
          >
            &#10005;
          </span>
        </div>
      )}

      {maxPrice !== 1000 && (
        <div className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700">
          <span>Max Price: {formatPrice(maxPrice, "EGP")}</span>
          <span
            onClick={() => updateParam("maxP", "")}
            className=" cursor-pointer px-4 text-sm "
          >
            &#10005;
          </span>
        </div>
      )}
    </div>
  );
};
