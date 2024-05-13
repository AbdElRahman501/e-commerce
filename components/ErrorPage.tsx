import React from "react";
import UnPlug_Icon from "./icons/UnPlug_Icon";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center pb-32 text-black dark:text-white">
      <UnPlug_Icon className="w-[80vw] fill-current" />
      <h1 className=" text-6xl font-bold  md:text-9xl">404</h1>
      <h2 className="text-xl font-bold">Oops! Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>

      <Link
        href="/"
        replace
        className="my-5 rounded-lg bg-black px-4 py-2 text-center uppercase text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
