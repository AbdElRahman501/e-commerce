"use client";
import { createUrl, formatPrice } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const FilterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const allowedParams = ["gf", "ctf", "cl", "szf", "clf", "minP", "maxP"];
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    if (allowedParams.includes(key)) params[key] = value;
  });

  const allKeysHaveValues = (obj: Record<string, any>) => {
    console.log(
      "🚀 ~ allKeysHaveValues ~ Object.entries(obj):",
      Object.entries(obj),
    );

    return (
      Object.entries(obj).length > 0 &&
      Object.entries(obj)
        .filter(
          ([key, value]) =>
            !(
              (key === "maxP" && value === "1000") ||
              (key === "minP" && value === "0")
            ),
        )
        .find(([key, value]) => value !== "")
    );
  };

  function updateParam(key: string, value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  }

  const item = (key: string, value: string) => {
    if (!allowedParams.includes(key)) return null;
    switch (key) {
      case "gf":
        return (
          <div className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700">
            <span>
              {parseInt(value) === 1
                ? "Men"
                : parseInt(value) === 0
                  ? "Women"
                  : ""}
            </span>
            <span
              onClick={() => updateParam(key, "")}
              className=" cursor-pointer px-4 text-sm "
            >
              &#10005;
            </span>
          </div>
        );
      case "maxP":
        return (
          key === "maxP" &&
          value !== "1000" && (
            <div className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700">
              <span>{formatPrice(parseInt(value), "EGP")}</span>
              <span
                onClick={() => updateParam(key, "")}
                className=" cursor-pointer px-4 text-sm "
              >
                &#10005;
              </span>
            </div>
          )
        );
      case "minP":
        return (
          key === "minP" &&
          value !== "0" && (
            <div className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700">
              <span>{formatPrice(parseInt(value), "EGP")}</span>
              <span
                onClick={() => updateParam(key, "")}
                className=" cursor-pointer px-4 text-sm "
              >
                &#10005;
              </span>
            </div>
          )
        );
      default:
        return (
          <div className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700">
            <span>{value}</span>
            <span
              onClick={() => updateParam(key, "")}
              className=" cursor-pointer px-4 text-sm "
            >
              &#10005;
            </span>
          </div>
        );
    }
  };

  return (
    <div className="scroll-bar-hidden flex gap-3 overflow-scroll px-5 pt-5 md:hidden md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {allKeysHaveValues(params) && (
        <div
          onClick={() => router.replace(pathname, { scroll: false })}
          className=" cursor-pointer rounded-xl bg-primary_color  px-4 py-2 text-white dark:bg-white dark:text-black "
        >
          Reset
        </div>
      )}

      {[...searchParams.entries()]
        .filter(([key, value]) => key !== "ft" && value)
        .map(([key, value], index) => (
          <>{item(key, value)}</>
        ))}
    </div>
  );
};
