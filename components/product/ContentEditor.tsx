import React from "react";
import CustomInput from "../CustomInput";

interface DescriptionItem {
  title?: string;
  list?: string[];
  images?: string[];
  description?: string;
}

interface ContentProps {
  [category: string]: DescriptionItem[];
}

type KeysType = "title" | "list" | "images" | "description";

const ContentEditor = ({
  content,
  setContent,
}: {
  content: ContentProps;
  setContent: (content: ContentProps) => void;
}) => {
  const [title, setTitle] = React.useState<string>("");

  const addTitle = () => {
    if (title.trim() !== "") {
      setContent({
        ...content,
        [title]: [],
      });
      setTitle("");
    }
  };

  const addObject = (title: string) => {
    const updatedContent = { ...content };
    const updatedItems = updatedContent[title];
    updatedItems.push({});
    setContent(updatedContent);
  };

  const handleRemoveTitle = (title: string) => {
    const updatedContent = { ...content };
    delete updatedContent[title];
    setContent(updatedContent);
  };
  const handleRemoveObject = (title: string, index: number) => {
    const updatedContent = { ...content };
    const updatedItems = updatedContent[title].filter((_, i) => i !== index);
    updatedContent[title] = updatedItems;
    setContent(updatedContent);
  };

  const handleRemoveKey = (title: string, index: number, key: KeysType) => {
    const updatedContent = { ...content };
    const updatedItems = updatedContent[title];
    delete updatedItems[index][key];
    updatedContent[title] = updatedItems;
    setContent(updatedContent);
  };

  const handleAddKey = (title: string, index: number, key: KeysType) => {
    const updatedContent = { ...content };
    const updatedItems = updatedContent[title];
    const item = updatedItems[index];
    updateItemKeyValue(item, key, "");
    setContent(updatedContent);
  };

  const handleOnChange = (
    title: string,
    index: number,
    key: KeysType,
    value: string,
  ) => {
    const updatedContent = { ...content };
    const updatedItems = updatedContent[title];
    const item = updatedItems[index];
    updateItemKeyValue(item, key, value);
    setContent(updatedContent);
  };

  const updateItemKeyValue = (
    item: DescriptionItem,
    key: KeysType,
    value: string,
  ) => {
    switch (key) {
      case "title":
        item.title = value;
        break;
      case "list":
        item.list = value.split(" - ");
        break;
      case "images":
        item.images = value.split(" - ");
        break;
      case "description":
        item.description = value;
        break;
      default:
        break;
    }
  };
  const restOfyKeys = (array: string[]) => {
    const keys = ["title", "list", "images", "description"];
    return keys.filter((key) => !array.includes(key));
  };
  return (
    <>
      <div className="flex flex-col gap-1">
        {Object.entries(content).map(([title, items]) => (
          <div
            key={title}
            className="flex flex-col gap-1 rounded-lg border border-gray-300 p-3 dark:border-gray-700"
          >
            <div className="flex items-center justify-between gap-1">
              <h2>{title}</h2>
              <button
                className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-pink-500 dark:border-gray-700"
                type="button"
                onClick={() => handleRemoveTitle(title)}
              >
                remove
              </button>
            </div>
            {items.map((item, index) => (
              <div className="flex flex-col gap-1 rounded-lg p-3" key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <div key={key} className="flex gap-1">
                    <CustomInput
                      label={key}
                      name={key}
                      type="text"
                      placeholder={`Enter new ${key} ${key === "title" || key === "description" ? "" : "separated with ' - '"} `}
                      defaultValue={value}
                      onChange={(e) => {
                        handleOnChange(
                          title,
                          index,
                          key as KeysType,
                          e.target.value,
                        );
                      }}
                    />
                    <button
                      className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-pink-500 dark:border-gray-700"
                      type="button"
                      onClick={() =>
                        handleRemoveKey(title, index, key as KeysType)
                      }
                    >
                      remove
                    </button>
                  </div>
                ))}
                <div className="flex gap-3">
                  {restOfyKeys(Object.entries(item).map(([key]) => key)).map(
                    (key) => (
                      <button
                        onClick={() =>
                          handleAddKey(title, index, key as KeysType)
                        }
                        key={key}
                        type="button"
                      >
                        {key}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    className="text-pink-500"
                    onClick={() => handleRemoveObject(title, index)}
                  >
                    remove object
                  </button>
                </div>
              </div>
            ))}
            <button
              className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-green-500 dark:border-gray-700"
              type="button"
              onClick={() => addObject(title)}
            >
              add object
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <CustomInput
          label="Title"
          name="title"
          type="text"
          placeholder="Enter new Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 dark:border-gray-700"
          type="button"
          onClick={addTitle}
        >
          Add title
        </button>
      </div>
    </>
  );
};

export default ContentEditor;
