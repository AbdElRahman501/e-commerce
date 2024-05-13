"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AddNewButton = ({ name }: { name?: string }) => {
  const pathname = usePathname();
  if (!name) return null;
  const addNewPathName: string = "addNew" + name.toUpperCase();
  return (
    <div className="flex gap-2">
      <Link
        replace
        scroll={false}
        href={`${pathname}?${addNewPathName}=true`}
        className="max-h-14 w-full rounded-lg border bg-black p-4 text-center uppercase text-white  duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
      >
        Add {name}
      </Link>
    </div>
  );
};

export default AddNewButton;
