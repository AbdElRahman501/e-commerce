"use client";

import DropDown_icon from "./icons/DropDown_icon";

const GoUpButton = () => {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="rotate-180 ">
      <div className="m-5 animate-bounce">
        <button
          onClick={scrollToTop}
          className={`m-[5px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-3xl text-black  dark:text-black`}
        >
          <DropDown_icon className="w-5" />
        </button>
      </div>
    </div>
  );
};

export default GoUpButton;
