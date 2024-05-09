"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActionButtons = ({ name, id }: { name: string; id: string }) => {
  const pathName = usePathname();

  const editPathName = "edit" + name.toUpperCase() + "Id";
  const removePathName = "remove" + name.toUpperCase() + "Id";

  return (
    <div className="flex gap-2">
      <Link
        replace
        scroll={false}
        href={`${pathName}?${editPathName}=${id}`}
        className=" text-blue-500 hover:underline dark:text-blue-400 dark:hover:underline "
      >
        edit
      </Link>
      <Link
        replace
        scroll={false}
        href={`${pathName}?${removePathName}=${id}`}
        className=" text-red-500 hover:underline dark:hover:underline "
      >
        remove
      </Link>
    </div>
  );
};

export default ActionButtons;
