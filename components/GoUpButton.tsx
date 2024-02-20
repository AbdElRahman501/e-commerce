"use client";

const GoUpButton = () => {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  return (
    <div className="rotate-180 ">
      <div className="m-5 animate-bounce">
        <button
          onClick={scrollToTop}
          className={`m-[5px] flex h-[50px] w-[50px] rotate-90  items-center justify-center rounded-full bg-white text-3xl text-black  dark:text-black`}
        >
          {`->`}
        </button>
      </div>
    </div>
  );
};

export default GoUpButton;
