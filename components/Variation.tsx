import { VariationOption, Variation as VariationType } from "@/types";
import {
  createUrl,
  formatPrice,
  getSubVariations,
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
  variation,
  option,
  handleSelectionChange,
  selectedOptions,
  price,
}: {
  handleSelectionChange: (type: string, option: VariationOption) => void;
  selectedOptions: Record<string, string>;
  variation: any;
  option: any;
  basePrice: number;
  price?: number;
}) => {
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

  function allValuesEqual<T>(arr: T[]): boolean {
    if (arr.length === 0) {
      return true; // Assuming an empty array means all values are "equal"
    }
    const firstValue = arr[0];
    for (const value of arr) {
      if (value !== firstValue) {
        return false;
      }
    }
    return true;
  }
  const calculatePriceForOption = (
    option: VariationOption,
    basePrice: number,
    selectedOptions: Record<string, string>,
  ): number => {
    let price = basePrice + option.priceAdjustment;

    const addSubVariationPrice = (subVariations: VariationType[]) => {
      subVariations.forEach((subVar) => {
        const selectedSubOptionName = selectedOptions[subVar.type];
        if (selectedSubOptionName) {
          const selectedSubOption = subVar.options.find(
            (opt) => opt.name === selectedSubOptionName,
          );
          if (selectedSubOption) {
            price += selectedSubOption.priceAdjustment;
            if (
              selectedSubOption.subVariations &&
              selectedSubOption.subVariations.length > 0
            ) {
              addSubVariationPrice(selectedSubOption.subVariations);
            }
          }
        }
      });
    };

    if (option.subVariations && option.subVariations.length > 0) {
      addSubVariationPrice(option.subVariations);
    }

    return price;
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
            {variation.options.map((option) => {
              const priceDisplay = !allValuesEqual(
                variation.options.map((op) => op.priceAdjustment),
              );
              const optionPrice =
                option.subVariations.length > 0
                  ? calculatePriceForOption(option, basePrice, selectedOptions)
                  : option.priceAdjustment + basePrice;

              const price = priceDisplay ? optionPrice : undefined;
              return item({
                variation,
                option,
                handleSelectionChange,
                selectedOptions,
                basePrice,
                price,
              });
            })}
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
            {variation.options.map((option) => {
              const priceDisplay = !allValuesEqual(
                variation.options.map((op) => op.priceAdjustment),
              );

              const parentPrice =
                variations
                  .find((v) => v.type === option?.parentType)
                  ?.options.find((o) => o.name === option?.parentName)
                  ?.priceAdjustment || 0;

              const price = priceDisplay
                ? basePrice + option.priceAdjustment + parentPrice
                : undefined;

              return item({
                variation,
                option,
                handleSelectionChange,
                selectedOptions,
                basePrice,
                price,
              });
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default Variation;
