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
            className={`${invalidClass} peer h-14 w-full rounded-lg border-[1px] border-gray-400 bg-transparent px-4 pt-3 text-base outline-none placeholder-shown:pt-0  focus:border-orange-500 focus:pt-3 focus:ring-blue-500  motion-reduce:transition-none dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-200 `}
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
            className={`${invalidClass} peer h-20 w-full rounded-lg border-[1px] border-gray-400 bg-transparent px-4 pt-5 text-base outline-none placeholder-shown:pt-0  focus:border-orange-500 focus:pt-5 focus:ring-blue-500  motion-reduce:transition-none dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-200 `}
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
                  className={`${invalidClass} peer flex h-14 w-full cursor-pointer items-center justify-between rounded-lg border-[1px] border-gray-400 bg-transparent px-4 text-base outline-none has-[:checked]:border-orange-500 dark:border-gray-700 dark:text-white has-[:checked]:dark:border-orange-500 `}
                >
                  {option}
                  <input
                    type="radio"
                    name={name}
                    id={option}
                    value={option}
                    defaultChecked={index === 0}
                    className="peer hidden"
                  />
                  <div className="flex h-6 w-6 items-center justify-center rounded-full text-white outline outline-[1px]  outline-gray-200 peer-checked:bg-orange-500 peer-checked:outline-orange-500 peer-checked:after:font-bold peer-checked:after:content-['✓']  "></div>
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
            required={required}
            type="checkbox"
            name={name}
            id={name}
            value={label}
            onChange={onChange}
            className="peer hidden"
          ></input>
          <div className="flex h-6 w-6 items-center justify-center rounded-full text-white outline outline-[1px] outline-gray-400  peer-checked:bg-orange-500 peer-checked:outline-orange-500 peer-checked:after:font-bold peer-checked:after:content-['✓']  "></div>
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
            readOnly={value && !onChange}
            placeholder=""
            className={`${invalidClass} peer h-14 w-full rounded-lg border-[1px] border-gray-400 bg-transparent px-4 pt-3 text-base outline-none placeholder-shown:pt-0  focus:border-orange-500 focus:pt-3 focus:ring-blue-500  motion-reduce:transition-none dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-200 `}
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
