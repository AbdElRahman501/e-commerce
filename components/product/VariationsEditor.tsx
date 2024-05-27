import React from "react";
import CustomInput from "../CustomInput";
import { Variation, VariationOption } from "@/types";
import CustomSelect from "../CustomeSelect";
import { getAllImages } from "@/utils";
import Image from "next/image";

interface ContentEditorProps {
  variations: Variation[];
  setVariations: (variations: Variation[]) => void;
  profitRate: number;
  images: Record<string, string[]>;
}

const VariationsEditor: React.FC<ContentEditorProps> = ({
  variations,
  setVariations,
  images,
  profitRate,
}) => {
  const addVariation = () => {
    setVariations([...variations, { type: "", options: [] }]);
  };

  const removeVariation = (index: number) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const updateVariation = (
    index: number,
    field: keyof Variation,
    value: any,
  ) => {
    const newVariations = variations.map((variation, i) =>
      i === index ? { ...variation, [field]: value } : variation,
    );
    setVariations(newVariations);
  };

  const addOption = (variationIndex: number) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: [
              ...variation.options,
              {
                name: "",
                priceAdjustment: 0,
                minPriceAdjustment: 0,
                subVariations: [],
              },
            ],
          }
        : variation,
    );
    setVariations(newVariations);
  };

  const removeOption = (variationIndex: number, optionIndex: number) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: variation.options.filter((_, j) => j !== optionIndex),
          }
        : variation,
    );
    setVariations(newVariations);
  };

  const updateOption = (
    variationIndex: number,
    optionIndex: number,
    field: keyof VariationOption,
    value: any,
  ) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: variation.options.map((option, j) =>
              j === optionIndex ? { ...option, [field]: value } : option,
            ),
          }
        : variation,
    );
    setVariations(newVariations);
  };

  const addSubVariation = (variationIndex: number, optionIndex: number) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: variation.options.map((option, j) =>
              j === optionIndex
                ? {
                    ...option,
                    subVariations: [
                      ...option.subVariations,
                      { type: "", options: [] },
                    ],
                  }
                : option,
            ),
          }
        : variation,
    );
    setVariations(newVariations);
  };

  const removeSubVariation = (
    variationIndex: number,
    optionIndex: number,
    subVariationIndex: number,
  ) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: variation.options.map((option, j) =>
              j === optionIndex
                ? {
                    ...option,
                    subVariations: option.subVariations.filter(
                      (_, k) => k !== subVariationIndex,
                    ),
                  }
                : option,
            ),
          }
        : variation,
    );
    setVariations(newVariations);
  };

  const updateSubVariation = (
    variationIndex: number,
    optionIndex: number,
    subVariationIndex: number,
    field: keyof Variation,
    value: any,
  ) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: variation.options.map((option, j) =>
              j === optionIndex
                ? {
                    ...option,
                    subVariations: option.subVariations.map(
                      (subVariation, k) =>
                        k === subVariationIndex
                          ? { ...subVariation, [field]: value }
                          : subVariation,
                    ),
                  }
                : option,
            ),
          }
        : variation,
    );
    setVariations(newVariations);
  };

  const addSubVariationOption = (
    variationIndex: number,
    optionIndex: number,
    subVariationIndex: number,
  ) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: variation.options.map((option, j) =>
              j === optionIndex
                ? {
                    ...option,
                    subVariations: option.subVariations.map(
                      (subVariation, k) =>
                        k === subVariationIndex
                          ? {
                              ...subVariation,
                              options: [
                                ...subVariation.options,
                                {
                                  name: "",
                                  priceAdjustment: 0,
                                  minPriceAdjustment: 0,
                                  subVariations: [],
                                },
                              ],
                            }
                          : subVariation,
                    ),
                  }
                : option,
            ),
          }
        : variation,
    );
    setVariations(newVariations);
  };

  const removeSubVariationOption = (
    variationIndex: number,
    optionIndex: number,
    subVariationIndex: number,
    subOptionIndex: number,
  ) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: variation.options.map((option, j) =>
              j === optionIndex
                ? {
                    ...option,
                    subVariations: option.subVariations.map(
                      (subVariation, k) =>
                        k === subVariationIndex
                          ? {
                              ...subVariation,
                              options: subVariation.options.filter(
                                (_, l) => l !== subOptionIndex,
                              ),
                            }
                          : subVariation,
                    ),
                  }
                : option,
            ),
          }
        : variation,
    );
    setVariations(newVariations);
  };

  const updateSubVariationOption = (
    variationIndex: number,
    optionIndex: number,
    subVariationIndex: number,
    subOptionIndex: number,
    field: keyof VariationOption,
    value: any,
  ) => {
    const newVariations = variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            options: variation.options.map((option, j) =>
              j === optionIndex
                ? {
                    ...option,
                    subVariations: option.subVariations.map(
                      (subVariation, k) =>
                        k === subVariationIndex
                          ? {
                              ...subVariation,
                              options: subVariation.options.map(
                                (subOption, l) =>
                                  l === subOptionIndex
                                    ? { ...subOption, [field]: value }
                                    : subOption,
                              ),
                            }
                          : subVariation,
                    ),
                  }
                : option,
            ),
          }
        : variation,
    );
    setVariations(newVariations);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center text-2xl font-bold">Variations Editor</h1>
      {variations.map((variation, variationIndex) => (
        <div
          key={variationIndex}
          className="flex flex-col gap-1 rounded-lg border border-gray-300 p-3 dark:border-gray-700"
        >
          <div className="flex gap-2">
            <CustomInput
              name="type"
              label="Type"
              type="text"
              placeholder="Type"
              value={variation.type}
              onChange={(e) =>
                updateVariation(variationIndex, "type", e.target.value)
              }
            />
            <button
              type="button"
              className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-pink-500 dark:border-gray-700"
              onClick={() => removeVariation(variationIndex)}
            >
              Remove
            </button>
            <button
              type="button"
              className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-green-500 dark:border-gray-700"
              onClick={() => addOption(variationIndex)}
            >
              Add
            </button>
          </div>
          <div>
            {variation.options.map((option, optionIndex) => (
              <div key={optionIndex} className="ml-4 flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <CustomInput
                      name="name"
                      label="Option Name"
                      type="text"
                      placeholder="Option Name"
                      value={option.name}
                      onChange={(e) =>
                        updateOption(
                          variationIndex,
                          optionIndex,
                          "name",
                          e.target.value,
                        )
                      }
                    />
                    <CustomInput
                      name="priceAdjustment"
                      label="Price Adjustment"
                      type="number"
                      placeholder={`${(option.minPriceAdjustment / ((100 - profitRate) / 100)).toFixed(2)} Price Adjustment `}
                      value={option.priceAdjustment}
                      onChange={(e) =>
                        updateOption(
                          variationIndex,
                          optionIndex,
                          "priceAdjustment",
                          parseFloat(e.target.value),
                        )
                      }
                    />
                    <CustomInput
                      name="minPriceAdjustment"
                      label="Min Price Adjustment"
                      type="number"
                      placeholder="Min Price Adjustment"
                      value={option.minPriceAdjustment}
                      onChange={(e) =>
                        updateOption(
                          variationIndex,
                          optionIndex,
                          "minPriceAdjustment",
                          parseFloat(e.target.value),
                        )
                      }
                    />
                    <button
                      type="button"
                      className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-pink-500 dark:border-gray-700"
                      onClick={() => removeOption(variationIndex, optionIndex)}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-green-500 dark:border-gray-700"
                      onClick={() =>
                        addSubVariation(variationIndex, optionIndex)
                      }
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex gap-1">
                    {option.imageUrl && (
                      <Image
                        src={option.imageUrl}
                        alt="option"
                        height={50}
                        width={50}
                      />
                    )}
                    <CustomSelect
                      type="text"
                      name="imageUrl"
                      label="Image Url"
                      options={getAllImages(images)}
                      placeholder="New Color"
                      value={option.imageUrl}
                      onChange={(option) =>
                        updateOption(
                          variationIndex,
                          optionIndex,
                          "imageUrl",
                          option,
                        )
                      }
                      optionComponent={(option) => (
                        <>
                          <Image
                            src={option}
                            alt="option"
                            height={50}
                            width={50}
                          />
                          {option}
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="ml-4">
                  {option.subVariations.map(
                    (subVariation, subVariationIndex) => (
                      <div
                        key={subVariationIndex}
                        className="flex flex-col gap-2"
                      >
                        <div className="flex gap-2">
                          <CustomInput
                            name="type"
                            label="SubVariation Type"
                            type="text"
                            placeholder="Type"
                            value={subVariation.type}
                            onChange={(e) =>
                              updateSubVariation(
                                variationIndex,
                                optionIndex,
                                subVariationIndex,
                                "type",
                                e.target.value,
                              )
                            }
                          />
                          <button
                            type="button"
                            className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-pink-500 dark:border-gray-700"
                            onClick={() =>
                              removeSubVariation(
                                variationIndex,
                                optionIndex,
                                subVariationIndex,
                              )
                            }
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-green-500 dark:border-gray-700"
                            onClick={() =>
                              addSubVariationOption(
                                variationIndex,
                                optionIndex,
                                subVariationIndex,
                              )
                            }
                          >
                            Add
                          </button>
                        </div>
                        <div className="ml-4">
                          {subVariation.options.map(
                            (subOption, subOptionIndex) => (
                              <div key={subOptionIndex} className="flex gap-2">
                                <CustomInput
                                  name="name"
                                  label="Option Name"
                                  type="text"
                                  placeholder="Option Name"
                                  value={subOption.name}
                                  onChange={(e) =>
                                    updateSubVariationOption(
                                      variationIndex,
                                      optionIndex,
                                      subVariationIndex,
                                      subOptionIndex,
                                      "name",
                                      e.target.value,
                                    )
                                  }
                                />
                                <CustomInput
                                  name="priceAdjustment"
                                  label="Price Adjustment"
                                  type="number"
                                  placeholder={`${(subOption.minPriceAdjustment / ((100 - profitRate) / 100)).toFixed(2)} Price Adjustment `}
                                  value={subOption.priceAdjustment}
                                  onChange={(e) =>
                                    updateSubVariationOption(
                                      variationIndex,
                                      optionIndex,
                                      subVariationIndex,
                                      subOptionIndex,
                                      "priceAdjustment",
                                      parseFloat(e.target.value),
                                    )
                                  }
                                />
                                <CustomInput
                                  name="minPriceAdjustment"
                                  label="Min Price Adjustment"
                                  type="number"
                                  placeholder="Min Price Adjustment"
                                  value={subOption.minPriceAdjustment}
                                  onChange={(e) =>
                                    updateSubVariationOption(
                                      variationIndex,
                                      optionIndex,
                                      subVariationIndex,
                                      subOptionIndex,
                                      "minPriceAdjustment",
                                      parseFloat(e.target.value),
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-pink-500 dark:border-gray-700"
                                  onClick={() =>
                                    removeSubVariationOption(
                                      variationIndex,
                                      optionIndex,
                                      subVariationIndex,
                                      subOptionIndex,
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="h-14 w-full text-nowrap rounded-lg border border-gray-300 px-2 text-green-500 dark:border-gray-700"
        onClick={addVariation}
      >
        Add
      </button>
      {/* <code>{JSON.stringify(variations, null, 2)}</code> */}
    </div>
  );
};

export default VariationsEditor;
