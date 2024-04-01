import { FormInput } from "@/types";
import React from "react";
import DropDown_icon from "./icons/DropDown_icon";

type CustomInputProps = FormInput & {
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  min?: number;
  max?: number;
};

const CustomInput = ({
  label,
  type,
  placeholder,
  options,
  name,
  required,
  minLength,
  maxLength,
  pattern,
  onChange,
  value,
  defaultValue,
  disabled = false,
  readOnly = false,
  hidden,
  min,
  max,
}: CustomInputProps) => {
  switch (type) {
    case "select":
      return (
        <div className="relative flex w-full flex-col">
          <select
            name={name}
            id={name}
            required={required}
            defaultValue={value ? undefined : defaultValue}
            value={defaultValue ? undefined : value || ""}
            onChange={onChange}
            disabled={disabled}
            className=" peer h-14 w-full appearance-none rounded-lg border-[1px] border-gray-400 bg-transparent px-4 pt-3 text-base outline-none placeholder-shown:pt-0 invalid:border-pink-500 invalid:text-pink-600 focus:border-orange-500 focus:pt-3 focus:ring-blue-500 focus:invalid:border-pink-500  focus:invalid:ring-pink-500 enabled:cursor-pointer motion-reduce:transition-none  dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:invalid:border-pink-500 dark:focus:ring-gray-200 "
          >
            <option value="" disabled className="text-gray-400">
              {placeholder}
            </option>
            {options &&
              options.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="text-black dark:text-black"
                >
                  {option}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 transition-all duration-200 peer-enabled:peer-hover:text-gray-200">
            <DropDown_icon className="h-6 w-6 fill-current" />
          </div>
          <label
            className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
            htmlFor={name}
          >
            {name}
          </label>
        </div>
      );
    case "textarea":
      return (
        <div className="relative flex w-full flex-col">
          <textarea
            name={name}
            id={name}
            defaultValue={defaultValue}
            value={value}
            placeholder=""
            required={required}
            readOnly={readOnly || (value && !onChange ? true : false)}
            onChange={onChange}
            className=" peer h-20 w-full rounded-lg border-[1px] border-gray-400 bg-transparent px-4 pt-5 text-base outline-none placeholder-shown:pt-0  focus:border-orange-500 focus:pt-5 focus:ring-blue-500  motion-reduce:transition-none dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-200 "
          />
          <label
            className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
            htmlFor={name}
          >
            {placeholder}
          </label>
          <p className="hidden text-sm text-pink-600 peer-invalid:block">
            add valid {name} value
          </p>
        </div>
      );
    case "fieldset":
      return (
        <fieldset>
          <div className=" flex flex-col gap-2 ">
            <h2 className=" text-xl font-semibold md:text-2xl">{label}</h2>
            {options &&
              options.map((option, index) => (
                <label
                  key={index}
                  className=" peer flex h-14 w-full cursor-pointer items-center justify-between rounded-lg border-[1px] border-gray-400 bg-transparent px-4 text-base outline-none has-[:checked]:border-orange-500 dark:border-gray-700 dark:text-white has-[:checked]:dark:border-orange-500"
                >
                  {option}
                  <input
                    type="radio"
                    name={name}
                    id={option}
                    value={option}
                    readOnly={readOnly || (value && !onChange ? true : false)}
                    defaultChecked={index === 0}
                    className="peer hidden"
                  />
                  <div className="flex h-6 w-6 min-w-6 items-center justify-center rounded-full text-white outline outline-[1px]  outline-gray-200 peer-checked:bg-orange-500 peer-checked:outline-orange-500 peer-checked:after:font-bold peer-checked:after:content-['✓']  "></div>
                </label>
              ))}
          </div>
        </fieldset>
      );
    case "checkbox":
      return (
        <label
          htmlFor={name}
          className="flex w-full cursor-pointer items-center gap-2 pb-4"
        >
          <input
            required={required}
            type="checkbox"
            name={name}
            id={name}
            value={label}
            onChange={onChange}
            readOnly={readOnly || (value && !onChange ? true : false)}
            className="peer hidden"
          ></input>
          <div className="flex h-6 w-6 min-w-6 items-center justify-center rounded-full text-white outline outline-[1px] outline-gray-400  peer-checked:bg-orange-500 peer-checked:outline-orange-500 peer-checked:after:font-bold peer-checked:after:content-['✓']  "></div>
          {label}
        </label>
      );
    default:
      return (
        <div className="relative flex w-full flex-col">
          <input
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            type={type}
            name={name}
            defaultValue={defaultValue}
            id={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly || (value && !onChange ? true : false)}
            placeholder=""
            min={min}
            max={max}
            hidden={hidden ? true : false}
            className="peer h-14 w-full rounded-lg border-[1px] border-gray-400 bg-transparent px-4 pt-3 text-base  outline-none placeholder-shown:pt-0 invalid:border-pink-500 invalid:text-pink-600 placeholder-shown:invalid:border-gray-400 placeholder-shown:invalid:text-black focus:border-orange-500 focus:pt-3 focus:text-black motion-reduce:transition-none dark:border-gray-700  dark:text-white dark:placeholder-gray-400 dark:invalid:border-pink-500 dark:invalid:text-pink-600 placeholder-shown:dark:invalid:border-gray-700 placeholder-shown:dark:invalid:text-white focus:dark:border-orange-500 focus:dark:text-white dark:focus:ring-gray-200 "
          />

          <label
            className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
            htmlFor={name}
          >
            {placeholder}
          </label>
          <p className="hidden text-sm text-pink-600 peer-invalid:block peer-placeholder-shown:peer-invalid:hidden peer-focus:hidden ">
            add valid {name} value
          </p>
        </div>
      );
  }
};

export default CustomInput;
