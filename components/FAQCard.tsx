"use client";
import React from "react";
import DropDown_icon from "./icons/DropDown_icon";

const FAQCard = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-200 px-2">
      <div className="flex items-center justify-between gap-3 pb-3 ">
        <h1 className="question text-base font-bold duration-300">
          {question}
        </h1>
        <div
          onClick={() => setOpen(!open)}
          className="rounded-full bg-gray-200 p-1 duration-300 hover:bg-black hover:text-white dark:bg-primary_color dark:hover:bg-gray-200 dark:hover:text-black"
        >
          <DropDown_icon
            className={`${open ? "rotate-180" : ""} aspect-square h-4 w-4 fill-current duration-200 ease-in-out`}
          />
        </div>
      </div>
      <div
        className={`max-h-0 overflow-hidden text-sm duration-700 ${open ? "max-h-96" : ""}`}
      >
        <p className="py-3">{answer}</p>
      </div>
    </div>
  );
};

export default FAQCard;
