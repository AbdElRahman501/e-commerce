import { VariationOption, Variation as VariationType } from "@/types";
import {
  createUrl,
  getSubVariations,
  optionPrice,
  validateSelectedOptions,
} from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type VariationProps = {
  basePrice: number;
  variations: VariationType[];
  selectedOptions: Record<string, string>;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  setImageUrl?: React.Dispatch<React.SetStateAction<string>>;
};

const item = ({
  variations,
  variation,
  option,
  handleSelectionChange,
  selectedOptions,
  basePrice,
}: {
  variations: VariationType[];
  handleSelectionChange: (type: string, option: VariationOption) => void;
  selectedOptions: Record<string, string>;
  variation: VariationType;
  option: VariationOption;
  basePrice: number;
}) => {
  const price = optionPrice({
    variation,
    option,
    basePrice,
    selectedOptions,
    variations,
  });
  switch (variation.type) {
    case "color":
      return (
        <button
          onClick={() => handleSelectionChange(variation.type, option)}
          key={option.name}
          className={`${selectedOptions[variation.type] === option.name ? " border-black dark:border-white " : "border-1 border-transparent"} rounded-full border-2 p-[1px]  duration-200 hover:scale-110`}
        >
          <span
            style={{ backgroundColor: option.name }}
            className="block h-7 w-7 rounded-full border border-gray-300"
          ></span>
        </button>
      );

    default:
      return (
        <button
          key={option.name}
          onClick={() => handleSelectionChange(variation.type, option)}
          className={`${selectedOptions[variation.type] === option.name ? " border-black dark:border-white " : " border-gray-200 dark:border-gray-700 "} rounded-xl border-2 p-2 px-4 text-sm duration-200 hover:scale-105 hover:border-black dark:hover:border-white`}
        >
          <span>{option.name} </span> {price && <span>- {"EGP " + price}</span>}
        </button>
      );
  }
};

const Variation = ({
  basePrice,
  variations,
  selectedOptions,
  setSelectedOptions,
  setImageUrl,
}: VariationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function setParam(selectedOptions: Record<string, string>) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    for (const key in selectedOptions) {
      if (selectedOptions.hasOwnProperty(key)) {
        newSearchParams.set(key, selectedOptions[key]);
      }
    }
    const optionUrl = createUrl(pathname, newSearchParams);
    return router.replace(optionUrl, { scroll: false });
  }

  const handleSelectionChange = (type: string, option: VariationOption) => {
    const newOptions = validateSelectedOptions(
      { ...selectedOptions, [type]: option.name },
      variations,
    );
    setSelectedOptions(newOptions);
    setImageUrl && setImageUrl((pv) => option.imageUrl || pv);
    setParam(newOptions);
  };

  return (
    <>
      {variations.map((variation) => (
        <div key={variation.type} className="flex flex-col gap-2">
          <p className="text-sm dark:text-white">
            <span className="text-gray-500">{variation.type}:</span>{" "}
            <strong>{selectedOptions[variation.type]}</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {variation.options.map((option) =>
              item({
                variations,
                variation,
                option,
                handleSelectionChange,
                selectedOptions,
                basePrice,
              }),
            )}
          </div>
        </div>
      ))}

      {getSubVariations(variations, selectedOptions).map((variation) => (
        <div key={variation.type} className="flex flex-col gap-2">
          <p className="text-sm dark:text-white">
            <span className="text-gray-500">{variation.type}:</span>{" "}
            <strong>{selectedOptions[variation.type]}</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {variation.options.map((option) =>
              item({
                variations,
                variation,
                option,
                handleSelectionChange,
                selectedOptions,
                basePrice,
              }),
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Variation;
