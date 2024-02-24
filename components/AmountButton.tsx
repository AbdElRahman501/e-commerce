import React from "react";

const AmountButton = ({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex h-11 max-w-max justify-between gap-1 overflow-hidden rounded-2xl border border-primary_color dark:border-white ">
      <button
        onClick={() => {
          setAmount(amount - 1);
        }}
        disabled={!(amount > 1)}
        type="button"
        className="w-10 flex-1 text-2xl enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25 "
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
        onBlur={() => setAmount((e) => (Number(e) < 1 ? 1 : Number(e)))}
        value={amount}
        className="w-10 bg-transparent text-center outline-none "
      />
      <button
        onClick={() => {
          setAmount(amount + 1);
        }}
        type="button"
        className="w-10 flex-1 text-2xl hover:bg-primary_color hover:text-white"
      >
        <span>&#43;</span>
      </button>
    </div>
  );
};

export default AmountButton;
