"use client";
import React from "react";
import Copy_icon from "../icons/Copy_icon";
import CheckMark from "../icons/CheckMark";

const OrderId = ({ id }: { id: string }) => {
  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
  };
  return (
    <button
      onClick={() => copyToClipboard(id)}
      type="button"
      className="group flex w-full justify-center text-center text-xl font-medium text-gray-600 duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white"
    >
      <div className="relative h-6 w-6">
        {copied ? <CheckMark /> : <Copy_icon />}
      </div>
      <span>Order #{id}</span>
    </button>
  );
};

export default OrderId;
