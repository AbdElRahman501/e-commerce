import { filterData } from "@/constants";
import React from "react";

const Gender = () => {
  return (
    <div className="relative flex h-10 rounded-full border">
      <div className="absolute left-0 top-0 -z-10 m-[2px] h-[calc(100%-4px)] w-[calc(50%-4px)] rounded-full border bg-primary_color  text-center text-primary_color"></div>
      <button className="m-[2px] flex h-[calc(100%-4px)] w-[calc(50%-4px)]  items-center justify-center text-center  text-white">
        <span>men</span>
      </button>
      <button className="m-[2px] flex h-[calc(100%-4px)] w-[calc(50%-4px)] items-center justify-center text-center  text-primary_color">
        <span>women</span>
      </button>
    </div>
  );
};

const Origin = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Origin</h1>
      <div className="flex flex-wrap gap-1">
        {filterData.origin.map((item, index) => (
          <button
            key={index}
            className="flex h-10 items-center justify-center rounded-full border border-primary_bg px-8 py-1 text-sm text-primary_color dark:border-white dark:text-white"
          >
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Categories</h1>
      <div className="flex flex-col gap-2">
        {filterData.categories.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              id="bordered-checkbox-1"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            ></input>
            <div className="flex w-full justify-between">
              <p className="flex  items-center text-sm text-primary_color  dark:text-white">
                {item.name}
              </p>
              <p className="flex  items-center text-sm text-primary_color  dark:text-white">
                {item.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Size = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Sizes</h1>
      <div className="flex flex-wrap gap-1">
        {filterData.sizes.map((item, index) => (
          <button
            key={index}
            className="flex aspect-square h-10 items-center justify-center rounded-xl border border-primary_bg py-1 text-sm text-primary_color dark:border-white dark:text-white"
          >
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Colors = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Colors</h1>
      <div className="flex flex-wrap gap-1">
        {filterData.colors.map((item, index) => (
          <button
            key={index}
            style={{ backgroundColor: item }}
            className="h-5 w-5 rounded-full duration-200 hover:scale-110"
          ></button>
        ))}
      </div>
    </div>
  );
};

const Price = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Prices</h1>
      <div className="flex w-full items-center gap-1">
        <input
          type="number"
          placeholder="Min"
          className="flex h-10 w-full items-center justify-center rounded-xl border border-primary_bg bg-transparent text-center text-sm text-primary_color dark:border-white dark:text-white"
        />
        <span>to</span>
        <input
          type="number"
          placeholder="max"
          className="flex h-10 w-full items-center justify-center rounded-xl border border-primary_bg bg-transparent text-center text-sm text-primary_color dark:border-white dark:text-white"
        />
      </div>
    </div>
  );
};
const FilterContainer = () => {
  return (
    <div className="a-filter hidden flex-col gap-7 rounded-3xl border border-gray-300 px-5 py-5 md:flex md:w-1/4 2xl:w-1/5">
      <Gender />
      <Origin />
      <Categories />
      <Size />
      <Colors />
      <Price />
    </div>
  );
};

export default FilterContainer;
