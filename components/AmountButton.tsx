import React from "react";
import DropDown_icon from "./icons/DropDown_icon";

const AmountButton = ({
  amount,
  className,
  setAmount,
}: {
  className?: string;
  amount: number;
  setAmount: (number: number) => void;
}) => {
  return (
    <div
      className={` flex  max-w-max items-center justify-between gap-1 overflow-hidden rounded-2xl outline outline-1 ${className}`}
    >
      <button
        onClick={() => {
          setAmount(amount - 1);
        }}
        disabled={!(amount > 1)}
        type="button"
        className=" h-full w-1/3 text-2xl enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25"
      >
        <DropDown_icon className=" m-auto mx-2 w-5" />
      </button>
      <p className="w-1/3 p-2 text-center ">{amount}</p>
      <button
        onClick={() => {
          setAmount(amount + 1);
        }}
        type="button"
        className="h-full w-1/3 text-2xl enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25"
      >
        <DropDown_icon className=" m-auto mx-2 w-5 rotate-180" />
      </button>
    </div>
  );
};

export default AmountButton;
