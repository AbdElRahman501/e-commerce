"use client";
import { filterData, filterInitialData } from "@/constants";
import React, { useEffect } from "react";
import { Sorting } from ".";
import { FilterType } from "@/types";
import { getAllCategories } from "@/utils";

const Gender = ({
  setFilter,
  filter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  return (
    <div className="relative flex h-14 min-h-14 w-full flex-grow-0 rounded-full border md:max-w-xs">
      <div
        className={`${filter.genderFilter === "female" ? "left-[50%] border bg-primary_color" : filter.genderFilter === "male" ? "left-0 border bg-primary_color" : ""} absolute top-0  -z-10 m-[2px] h-[calc(100%-4px)] w-[calc(50%-4px)] rounded-full  text-center   text-primary_color duration-200`}
      ></div>
      <button
        onClick={() =>
          setFilter((pv) => ({
            ...pv,
            genderFilter: pv.genderFilter === "male" ? "all" : "male",
          }))
        }
        className={`${filter.genderFilter === "male" ? "text-white" : "text-primary_color"} m-[2px] flex h-[calc(100%-4px)] w-[calc(50%-4px)]  items-center justify-center text-center  `}
      >
        <span>men</span>
      </button>
      <button
        onClick={() =>
          setFilter((pv) => ({
            ...pv,
            genderFilter: pv.genderFilter === "female" ? "all" : "female",
          }))
        }
        className={`${filter.genderFilter === "female" ? "text-white" : "text-primary_color"} m-[2px] flex h-[calc(100%-4px)] w-[calc(50%-4px)] items-center justify-center text-center  `}
      >
        <span>women</span>
      </button>
    </div>
  );
};

const Origin = ({
  setFilter,
  filter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Origin</h1>
      <div className="flex flex-wrap gap-1">
        {filterData.origin.map((item, index) => {
          const selected = filter.originFilter.includes(item);
          return (
            <button
              onClick={() => {
                setFilter({
                  ...filter,
                  originFilter: selected
                    ? filter.originFilter.filter(
                        (category) => category !== item,
                      )
                    : [...filter.originFilter, item],
                });
              }}
              key={index}
              className={` ${filter.originFilter.includes(item) ? "bg-primary_color text-white" : "text-primary_color"} flex h-10 items-center justify-center rounded-full border border-primary_bg px-8 py-1 text-sm text-primary_color dark:border-white dark:text-white`}
            >
              <span>{item}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Categories = ({
  setFilter,
  filter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  const [categories, setCategories] = React.useState<
    { name: string; count: number }[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getAllCategories(setCategories, setLoading);
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <h1>Categories</h1>
      <div className="flex flex-wrap gap-1">
        {categories.map((item, index) => {
          const selected = filter.selectedCategories.includes(item.name);
          return (
            <button
              onClick={() => {
                setFilter({
                  ...filter,
                  selectedCategories: selected
                    ? filter.selectedCategories.filter(
                        (category) => category !== item.name,
                      )
                    : [...filter.selectedCategories, item.name],
                });
              }}
              key={index}
              className={`${selected ? "bg-primary_color text-white" : ""} flex h-10 items-center justify-center rounded-full border border-primary_bg px-8 py-1 text-sm text-primary_color duration-300 dark:border-white dark:text-white`}
            >
              <span>{item.name + " (" + item.count + ")"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Size = ({
  setFilter,
  filter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Sizes</h1>
      <div className="flex flex-wrap gap-1">
        {filterData.sizes.map((item, index) => {
          const selected = filter.sizeFilter.includes(item);
          return (
            <button
              onClick={() => {
                setFilter({
                  ...filter,
                  sizeFilter: selected
                    ? filter.sizeFilter.filter((category) => category !== item)
                    : [...filter.sizeFilter, item],
                });
              }}
              key={index}
              className={`${selected ? "bg-primary_color text-white" : ""} flex aspect-square h-10 items-center justify-center rounded-xl border border-primary_bg py-1 text-sm text-primary_color dark:border-white dark:text-white`}
            >
              <span>{item}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Colors = ({
  setFilter,
  filter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Colors</h1>
      <div className="flex flex-wrap gap-3">
        {filterData.colors.map((item, index) => {
          const selected = filter.colorFilter.includes(item);
          return (
            <button
              key={index}
              onClick={() => {
                setFilter({
                  ...filter,
                  colorFilter: selected
                    ? filter.colorFilter.filter((category) => category !== item)
                    : [...filter.colorFilter, item],
                });
              }}
              // style={{ backgroundColor: item }}
              className={`${selected ? "scale-110  outline  outline-2 outline-blue-900 dark:outline-blue-400" : "border-transparent"} h-8 w-8 rounded-full p-[1px] outline-offset-1 duration-200 hover:scale-110`}

              // className={`${selected ? "scale-110  outline  outline-2 outline-blue-900 dark:outline-blue-400" : "border-transparent"} h-8 w-8 rounded-full p-[1px] outline-offset-1 duration-200 hover:scale-110`}
            >
              <span
                style={{ backgroundColor: item }}
                className="block aspect-square w-full rounded-full border"
              ></span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Price = ({
  setFilter,
  filter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Prices</h1>
      <div className="flex w-full items-center gap-1">
        <input
          type="number"
          placeholder="Min"
          value={filter.minPrice}
          onChange={(e) =>
            setFilter((pv) => ({
              ...pv,
              minPrice: parseInt(e.target.value),
            }))
          }
          className="flex h-10 w-full items-center justify-center rounded-xl border border-primary_bg bg-transparent text-center text-sm text-primary_color dark:border-white dark:text-white"
        />
        <span>to</span>
        <input
          type="number"
          placeholder="max"
          value={filter.maxPrice}
          onChange={(e) =>
            setFilter((pv) => ({
              ...pv,
              maxPrice: parseInt(e.target.value),
            }))
          }
          className="flex h-10 w-full items-center justify-center rounded-xl border border-primary_bg bg-transparent text-center text-sm text-primary_color dark:border-white dark:text-white"
        />
      </div>
    </div>
  );
};
const FilterContainer = ({
  filter,
  setFilter,
  isOpen,
  setSorting,
  sorting,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  isOpen: boolean;
  setSorting: React.Dispatch<React.SetStateAction<string>>;
  sorting: string;
}) => {
  return (
    <div
      style={{ bottom: isOpen ? "0" : "-100vh" }}
      className=" scroll-bar-hidden fixed  left-0  z-20 flex h-fit max-h-[calc(100dvh-9.5rem)] w-full flex-col gap-7 overflow-y-auto bg-slate-100 px-5 py-10 outline-1 outline-offset-1 outline-gray-300 duration-500 ease-in-out dark:bg-primary_bg dark:outline-gray-500 md:static md:max-h-none md:w-1/4 md:rounded-3xl md:outline 2xl:w-1/5"
    >
      <Sorting
        classNames="  min-h-14  min-w-max flex-nowrap items-center gap-3 rounded-3xl  border border-black px-2 dark:border-white flex md:hidden"
        setSorting={setSorting}
        sorting={sorting}
      />
      <Gender filter={filter} setFilter={setFilter} />
      <Origin filter={filter} setFilter={setFilter} />
      <Categories filter={filter} setFilter={setFilter} />
      <Size filter={filter} setFilter={setFilter} />
      <Colors filter={filter} setFilter={setFilter} />
      <Price filter={filter} setFilter={setFilter} />

      {filterInitialData !== filter && (
        <button
          type="button"
          onClick={() => setFilter(filterInitialData)}
          className="group mt-2 min-h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
        >
          <p className="duration-500 group-hover:scale-110">Reset</p>
        </button>
      )}
    </div>
  );
};

export default FilterContainer;
