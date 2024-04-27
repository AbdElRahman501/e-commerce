"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const DashBoardHomeLink = () => {
  const { data: session } = useSession();
  return (
    session?.user?.name === "Admin" && (
      <Link
        href="/dashboard"
        className="mr-auto font-semibold uppercase text-black  duration-200 hover:scale-110 dark:text-white"
      >
        dash
      </Link>
    )
  );
};

export default DashBoardHomeLink;
