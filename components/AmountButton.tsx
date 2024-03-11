import React from "react";

const AmountButton = ({
  amount,
  className,
  width,
  setAmount,
}: {
  width?: string;
  className?: string;
  amount: number;
  setAmount: (number: number) => void;
}) => {
  return (
    <div
      className={`flex h-11 max-w-max justify-between gap-1 overflow-hidden rounded-2xl outline outline-1 ${className}`}
    >
      <button
        onClick={() => {
          setAmount(amount - 1);
        }}
        disabled={!(amount > 1)}
        type="button"
        className={`${width} flex-1 text-2xl enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25 `}
      >
        <span>&#8722;</span>
      </button>
      <input
        type="number"
        name="amount"
        id="amount"
        min={1}
        step={1}
        onChange={(e) => setAmount(Number(e.target.value))}
        onBlur={() => setAmount(Number(amount) < 1 ? 1 : Number(amount))}
        value={amount}
        className={`${width} bg-transparent text-center outline-none`}
      />
      <button
        onClick={() => {
          setAmount(amount + 1);
        }}
        type="button"
        className={`${width} flex-1 text-2xl hover:bg-primary_color hover:text-white`}
      >
        <span>&#43;</span>
      </button>
    </div>
  );
};

export default AmountButton;
