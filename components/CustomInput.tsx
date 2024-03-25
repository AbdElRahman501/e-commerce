import { FormInput, PersonalInfo } from "@/types";
import React from "react";

type CustomInputProps = FormInput & {
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  value?: any;
  defaultValue?: string;
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
}: CustomInputProps) => {
  const invalidClass = "";
  // "invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:invalid:border-pink-500";
  switch (type) {
    case "select":
      return (
        <div className="relative flex w-full flex-col">
          <select
            name={name}
            id={name}
            required={required}
            defaultValue={value || ""}
            onChange={onChange}
            className={`${invalidClass} peer h-14 w-full rounded-lg border-[1px] border-gray-200 bg-transparent px-4 pt-3 text-base outline-none placeholder-shown:pt-0  focus:border-orange-500 focus:pt-3 focus:ring-blue-500  motion-reduce:transition-none dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-200 `}
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
          <label
            className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute left-0 top-2 flex h-full w-full select-none !overflow-visible truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
            htmlFor={name}
          >
            {name}
          </label>
          <p
            className={`${invalidClass && "peer-invalid:visible"} invisible text-sm text-pink-600 `}
          >
            add {name} value
          </p>
        </div>
      );
    case "textarea":
      return (
        <div className="relative flex w-full flex-col">
          <textarea
            name={name}
            id={name}
            defaultValue={defaultValue}
            placeholder=""
            required={required}
            onChange={onChange}
            className={`${invalidClass} peer h-20 w-full rounded-lg border-[1px] border-gray-200 bg-transparent px-4 pt-5 text-base outline-none placeholder-shown:pt-0  focus:border-orange-500 focus:pt-5 focus:ring-blue-500  motion-reduce:transition-none dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-200 `}
          />
          <label
            className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute left-0 top-2 flex h-full w-full select-none !overflow-visible truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
            htmlFor={name}
          >
            {placeholder}
          </label>
          <p
            className={`${invalidClass && "peer-invalid:visible"} invisible text-sm text-pink-600 `}
          >
            add {name} value
          </p>
        </div>
      );
    case "fieldset":
      return (
        <fieldset>
          <div className=" flex flex-col gap-2 ">
            <h2 className="pb-5 text-xl font-semibold md:text-2xl">{label}</h2>
            {options &&
              options.map((option, index) => (
                <label
                  key={index}
                  className={`${invalidClass} peer flex h-14 w-full cursor-pointer items-center justify-between rounded-lg border-[1px] border-gray-200 bg-transparent px-4 text-base outline-none has-[:checked]:bg-primary_color has-[:checked]:text-white has-[:checked]:ring-white dark:border-gray-700 dark:text-white `}
                >
                  {option}
                  <input
                    type="radio"
                    name={label}
                    id={option}
                    value={option}
                    defaultChecked={index === 0}
                    className="peer hidden"
                  />
                  <span className=" h-4 w-4 rounded-full outline  outline-2 outline-offset-1 outline-blue-500 peer-checked:bg-blue-500  "></span>
                </label>
              ))}
          </div>
        </fieldset>
      );
    case "checkbox":
      return (
        <label
          htmlFor={name}
          className="flex w-full cursor-pointer items-center gap-2 pb-2"
        >
          <input
            required={!value}
            type="checkbox"
            name={name}
            id={name}
            value={label}
            onChange={onChange}
            className="peer hidden"
          ></input>
          <div className="flex h-4 w-4 items-center justify-center rounded-sm outline outline-[1px] outline-gray-200  peer-checked:bg-blue-500 peer-checked:outline-blue-500 peer-checked:after:font-bold peer-checked:after:content-['✓']  "></div>
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
            placeholder=""
            className={`${invalidClass} peer h-14 w-full rounded-lg border-[1px] border-gray-200 bg-transparent px-4 pt-3 text-base outline-none placeholder-shown:pt-0  focus:border-orange-500 focus:pt-3 focus:ring-blue-500  motion-reduce:transition-none dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-200 `}
          />

          <label
            className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute left-0 top-2 flex h-full w-full select-none !overflow-visible truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
            htmlFor={name}
          >
            {placeholder}
          </label>
          <p
            className={`${invalidClass && "peer-invalid:visible"} invisible text-sm text-pink-600 `}
          >
            add {name} value
          </p>
        </div>
      );
  }
};

export default CustomInput;
