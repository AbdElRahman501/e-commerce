"use client";
import { useState } from "react";
import DropDown_icon from "./icons/DropDown_icon";

export default function CustomSelect({
  placeholder,
  options,
  onChange,
  value,
}: {
  placeholder: string;
  options: string[];
  onChange?: (e: any) => void;
  value?: any;
}) {
  const [isActive, setIsActive] = useState(false);

  const selectHandler = (e: any) => {
    const targetElement = e.target as HTMLDivElement;
    onChange && onChange(targetElement.textContent || "");
    setIsActive(!isActive);
  };

  return (
    <div className="relative w-full">
      <div
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className=" relative flex h-14 w-full cursor-pointer items-center justify-start rounded-lg border-[1px] border-gray-300 px-4  text-base   dark:border-gray-700 dark:text-white   "
      >
        {value || placeholder}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 transition-all duration-200 peer-enabled:peer-hover:text-gray-200">
          <DropDown_icon className="h-6 w-6 fill-current" />
        </div>
      </div>
      <div
        className=" absolute left-0 top-14 z-20 h-52 w-full overflow-y-auto bg-primary_color "
        style={{ display: isActive ? "block" : "none" }}
      >
        {options?.length &&
          options.map((option) => (
            <div
              key={option}
              onClick={selectHandler}
              className="cursor-pointer p-2 text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white "
            >
              <span
                style={{ backgroundColor: option }}
                className="mx-2 inline-block aspect-square h-4 rounded-full border border-gray-300"
              ></span>
              {option}
            </div>
          ))}
      </div>
    </div>
  );
}
