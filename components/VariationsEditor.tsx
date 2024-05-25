import React from "react";
import CustomInput from "./CustomInput";

interface Option {
  name: string;
  priceAdjustment: number;
}

interface Variation {
  type: string;
  options: Option[];
}

interface ContentEditorProps {
  variations: Variation[];
  setVariations: (variations: Variation[]) => void;
}

const VariationsEditor: React.FC<ContentEditorProps> = ({
  variations,
  setVariations,
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
            options: [...variation.options, { name: "", priceAdjustment: 0 }],
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
    field: keyof Option,
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

  return (
    <div>
      <h1>Variations Editor</h1>
      {variations.map((variation, variationIndex) => (
        <div
          key={variationIndex}
          className="flex flex-col gap-1 rounded-lg border border-gray-300 p-3 dark:border-gray-700"
        >
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
            Remove Variation
          </button>
          <div style={{ marginLeft: "20px", marginTop: "10px" }}>
            {variation.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex gap-2">
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
                  placeholder="Price Adjustment"
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
                <button
                  type="button"
                  className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-pink-500 dark:border-gray-700"
                  onClick={() => removeOption(variationIndex, optionIndex)}
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button
              type="button"
              className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-green-500 dark:border-gray-700"
              onClick={() => addOption(variationIndex)}
            >
              Add Option
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-green-500 dark:border-gray-700"
        onClick={addVariation}
      >
        Add Variation
      </button>
    </div>
  );
};

export default VariationsEditor;
