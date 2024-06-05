import React from "react";
import CustomInput from "../CustomInput";

const CollectionSelector = ({
  collections,
  selectedOptions,
  setSelectedOptions,
}: {
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  collections: string[];
}) => {
  const addItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const item = e.target.value;
    const newSelectedOptions = selectedOptions.filter(
      (option) => option !== item,
    );
    setSelectedOptions([...newSelectedOptions, item]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className="  text-nowrap rounded-xl border border-gray-200 py-2 pl-4  dark:border-gray-700"
          >
            <span>{option}</span>
            <span
              onClick={() =>
                setSelectedOptions(selectedOptions.filter((s) => s !== option))
              }
              className=" cursor-pointer px-4 text-sm "
            >
              &#10005;
            </span>
          </div>
        ))}
      </div>
      <CustomInput
        type="select"
        label="collections"
        placeholder="Enter collections"
        name="collections"
        options={collections}
        onChange={addItem}
      />
    </div>
  );
};

export default CollectionSelector;
