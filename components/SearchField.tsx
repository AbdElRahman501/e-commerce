"use client";
import { createUrl } from "@/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const SearchField = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const scrollToDiv = () => {
    const offset = 64 + 12;
    const position = divRef.current?.getBoundingClientRect();
    const top = position?.top || 0;
    return top + window.scrollY - offset;
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/shop", newParams));
  }
  return (
    <div ref={divRef} className="relative w-full max-w-xl flex-grow-0">
      <form onSubmit={onSubmit}>
        <input
          key={searchParams?.get("q")}
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
          onFocus={() => {
            if (window.innerWidth < 640) {
              window.scroll(0, scrollToDiv());
            } else {
              setTimeout(() => {
                window.scrollTo({ top: scrollToDiv(), behavior: "smooth" });
              }, 300);
            }
          }}
          className="h-14 w-full rounded-3xl  border border-black bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-primary_color focus:ring-blue-500 dark:border-white  dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-200 dark:focus:ring-gray-200"
        />
        <div className="absolute right-0 top-0 flex h-full w-14 items-center justify-center">
          <Image src="/icons/search.svg" alt="search" width={24} height={24} />
        </div>
      </form>
    </div>
  );
};

export default SearchField;
