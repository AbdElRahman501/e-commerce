"use client";
import { useState } from "react";
import DropDown_icon from "./icons/DropDown_icon";
import { FormInput } from "@/types";

export default function CustomSelect({
  placeholder,
  options,
  onChange,
  value,
  name,
  optionComponent,
}: FormInput & {
  optionComponent: (option: any) => JSX.Element;
}) {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full">
      <div className="relative flex w-full flex-col">
        <input
          type={"text"}
          name={name}
          id={name}
          value={value}
          onFocus={() => setIsActive(true)}
          onChange={(e) => {
            onChange && onChange(e.target.value);
            setQuery(e.target.value);
          }}
          placeholder=""
          className="peer h-14 w-full rounded-lg border-[1px] border-gray-300 bg-transparent px-4 pr-10 pt-3 text-base  outline-none placeholder-shown:pt-0 invalid:border-pink-500 invalid:text-pink-600 placeholder-shown:invalid:border-gray-300 placeholder-shown:invalid:text-black focus:border-2 focus:border-black focus:pt-3 focus:text-black placeholder-shown:invalid:focus:border-black motion-reduce:transition-none dark:border-gray-700  dark:text-white dark:placeholder-gray-300 dark:invalid:border-pink-500 dark:invalid:text-pink-600 placeholder-shown:dark:invalid:border-gray-700 placeholder-shown:dark:invalid:text-white  focus:dark:border-white focus:dark:text-white dark:focus:ring-gray-200 placeholder-shown:invalid:focus:dark:border-white "
        />

        <label
          className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
          htmlFor={name}
        >
          {placeholder}
        </label>
        <p className="hidden text-sm text-pink-600 peer-invalid:block peer-placeholder-shown:peer-invalid:hidden peer-focus:hidden ">
          add valid {placeholder} value
        </p>
        <div
          onClick={() => setIsActive(!isActive)}
          className="absolute inset-y-0 right-0 z-10 flex cursor-pointer items-center px-2 text-gray-700 transition-all duration-200 peer-enabled:peer-hover:text-gray-200"
        >
          <DropDown_icon className="h-6 w-6 fill-current" />
        </div>
      </div>

      <div
        className=" absolute left-0 top-14 z-20 h-52 w-full overflow-y-auto bg-primary_color "
        style={{ display: isActive ? "block" : "none" }}
      >
        {options?.length &&
          options
            .filter((option) => (query ? option.includes(query) : true))
            .map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  setIsActive(false);
                  onChange && onChange(option);
                }}
                className="cursor-pointer p-2 text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white "
              >
                {optionComponent && optionComponent(option)}
              </div>
            ))}
      </div>
    </div>
  );
}
