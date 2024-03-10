"use client";
import Image from "next/image";
import React, { useState } from "react";

const Sorting = ({
  sorting,
  setSorting,
  classNames = "",
}: {
  classNames?: string;
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const options = ["Price: Low to High", "Price: High to Low"];
  return (
    <div className={classNames}>
      {" "}
      <Image
        src={"/icons/sort.svg"}
        width={24}
        height={24}
        alt={"sort icon"}
        className="dark:invert"
      />
      <select
        name="sort"
        id="sort"
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
        className="h-full w-full appearance-none rounded-2xl bg-transparent text-base outline-none "
        // className=" h-full w-full rounded-2xl bg-transparent text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
      >
        <option value="" disabled>
          {" "}
          sort{" "}
        </option>
        {options &&
          options.map((option, i) => (
            <option key={i} value={option} className="dark:text-black">
              {option}
            </option>
          ))}
      </select>
      <Image
        src={"/icons/arrow-down.svg"}
        width={24}
        height={24}
        alt={"sort icon"}
        className="dark:invert"
      />
    </div>
  );
};

export default Sorting;
