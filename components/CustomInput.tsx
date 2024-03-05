import { FormInput, PersonalInfo } from "@/types";
import React from "react";

type CustomInputProps = FormInput & {
  setData: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  data: PersonalInfo;
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
  setData,
  data,
}: CustomInputProps) => {
  const value = data[name as keyof PersonalInfo];

  switch (type) {
    case "select":
      return (
        <div className="flex w-full flex-col gap-2">
          <label htmlFor={name}>{label}</label>
          <select
            name={name}
            id={name}
            required={required}
            value={value}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [name]: e.target.value }))
            }
            className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
          >
            <option value="">{placeholder}</option>
            {options &&
              options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
      );
    case "textarea":
      return (
        <div className="flex w-full flex-col gap-2">
          <label htmlFor={name}>{label}</label>
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [name]: e.target.value }))
            }
            className="h-20 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex w-full flex-col gap-2">
          <label htmlFor={name}>{label}</label>
          {options &&
            options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  required={!value}
                  type="checkbox"
                  readOnly={options.length === 1}
                  checked={option === value}
                  name={name}
                  id={name}
                  value={option}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, [name]: e.target.value }))
                  }
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                ></input>
                <p>{option}</p>
              </div>
            ))}
        </div>
      );

    default:
      return (
        <div className="flex w-full flex-col gap-2">
          <label htmlFor={name}>{label}</label>
          <input
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [name]: e.target.value }))
            }
            placeholder={placeholder}
            className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
          />
        </div>
      );
  }
};

export default CustomInput;
