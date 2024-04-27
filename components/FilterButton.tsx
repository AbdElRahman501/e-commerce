"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const FilterButton = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = searchParams?.get("ft") === "true";

  const scrollToDiv = () => {
    const offset = 64 + 12;
    const position = divRef.current?.getBoundingClientRect();
    const top = position?.top || 0;
    return top + window.scrollY - offset;
  };

  useEffect(() => {
    if (isOpen) window.scrollTo({ top: scrollToDiv(), behavior: "smooth" });
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set("ft", (!isOpen).toString());

  return (
    <div ref={divRef}>
      <Link
        shallow
        href={`${pathname}?${newSearchParams.toString()}`}
        replace
        className="flex h-14 w-14 flex-grow-0 items-center justify-center  rounded-2xl border bg-primary_color dark:bg-white md:hidden"
      >
        <Image
          src={isOpen ? "/icons/close.svg" : "/icons/filter.svg"}
          alt="search"
          width={30}
          height={30}
          className="invert dark:invert-0"
        />
      </Link>
    </div>
  );
};

export default FilterButton;
