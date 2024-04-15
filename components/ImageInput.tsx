"use client";
import { FormInput } from "@/types";
import React from "react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

type CustomInputProps = FormInput & {
  onChange?: (e: any) => void;
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  min?: number;
  max?: number;
};

const ImageInput = ({
  type,
  name,
  required,
  minLength,
  maxLength,
  pattern,
  onChange,
  value: initialValue,
  defaultValue,
  readOnly = false,
  hidden,
  min,
  max,
}: CustomInputProps) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <div className="relative flex w-full flex-col">
      <Image
        src={value || defaultValue || ""}
        width={100}
        height={100}
        style={{ objectFit: "cover" }}
        className="w-full rounded-2xl"
        alt="image"
      />
      <input
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        type={type}
        name={name}
        defaultValue={value ? undefined : defaultValue}
        id={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly || (value && !onChange ? true : false)}
        placeholder=""
        min={min}
        max={max}
        hidden={hidden ? true : false}
        className="peer h-14 w-full rounded-lg border-[1px] border-gray-300 bg-transparent px-4 pt-3 text-base  outline-none placeholder-shown:pt-0 invalid:border-pink-500 invalid:text-pink-600 placeholder-shown:invalid:border-gray-300 placeholder-shown:invalid:text-black focus:border-2 focus:border-black focus:pt-3 focus:text-black placeholder-shown:invalid:focus:border-black motion-reduce:transition-none dark:border-gray-700  dark:text-white dark:placeholder-gray-300 dark:invalid:border-pink-500 dark:invalid:text-pink-600 placeholder-shown:dark:invalid:border-gray-700 placeholder-shown:dark:invalid:text-white  focus:dark:border-white focus:dark:text-white dark:focus:ring-gray-200 placeholder-shown:invalid:focus:dark:border-white "
      />
      <ImageUpload handleAddImage={(image) => setValue(image)} color={name} />
    </div>
  );
};

export default ImageInput;
