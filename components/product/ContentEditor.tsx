"use client";
import React, { useState } from "react";
import CustomInput from "../CustomInput";

interface Content {
  name: string;
  html: string;
}

interface ContentEditorProps {
  content: Content[];
  setContent: (content: Content[]) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  setContent,
}) => {
  const addContent = () => {
    setContent([...content, { name: "", html: "" }]);
  };

  const removeContent = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const updateContent = (
    index: number,
    field: keyof Content,
    value: string,
  ) => {
    const newContents = content.map((content, i) =>
      i === index ? { ...content, [field]: value } : content,
    );
    setContent(newContents);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Content Editor</h1>

      {content.map((content, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 rounded-lg border border-gray-300 p-3 dark:border-gray-700"
        >
          <div className="flex gap-1">
            <CustomInput
              label={"name"}
              name={"name"}
              type="text"
              placeholder="Enter Name"
              value={content.name}
              onChange={(e) => updateContent(index, "name", e.target.value)}
            />
            <button
              className="h-14 text-nowrap rounded-lg border border-gray-300 px-2 text-pink-500 dark:border-gray-700"
              type="button"
              onClick={() => removeContent(index)}
            >
              Remove
            </button>
          </div>
          <CustomInput
            label={"html"}
            name={"html"}
            type="textarea"
            placeholder="Enter HTML"
            value={content.html}
            onChange={(e) => updateContent(index, "html", e.target.value)}
          />
        </div>
      ))}
      <button
        className="h-14 w-full text-nowrap rounded-lg border border-gray-300 px-2 text-green-500 dark:border-gray-700"
        type="button"
        onClick={addContent}
      >
        Add
      </button>
    </div>
  );
};

export default ContentEditor;
