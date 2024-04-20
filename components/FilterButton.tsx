"use client";
import { createUrl } from "@/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const FilterButton = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpen = searchParams?.get("ft") === "true";

  const scrollToDiv = () => {
    const offset = 64 + 12;
    const position = divRef.current?.getBoundingClientRect();
    const top = position?.top || 0;
    return top + window.scrollY - offset;
  };

  function setIsOpen(isOpen: boolean) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("ft", isOpen.toString());
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl);
  }

  const openFilter = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setTimeout(() => {
        const top = scrollToDiv();
        console.log("🚀 ~ setTimeout ~ top:", top);
        window.scrollTo({ top: top, behavior: "smooth" });
      }, 300);
      setIsOpen(true);
    }
  };

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

  return (
    <div ref={divRef}>
      <button
        type="button"
        onClick={openFilter}
        className="flex h-14 w-14 flex-grow-0 items-center justify-center  rounded-2xl border bg-primary_color dark:bg-white md:hidden"
      >
        <Image
          src={isOpen ? "/icons/close.svg" : "/icons/filter.svg"}
          alt="search"
          width={30}
          height={30}
          className="invert dark:invert-0"
        />
      </button>
    </div>
  );
};

export default FilterButton;
