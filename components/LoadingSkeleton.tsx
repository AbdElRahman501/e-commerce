import React from "react";
import LogoIcon from "./icons/LogoIcon";

export const LoadingLogo = () => {
  return (
    <div className=" flex min-h-screen w-full items-center justify-center ">
      <LogoIcon className="h-16 w-16 animate-pulse fill-black dark:fill-white md:h-20 md:w-20" />
    </div>
  );
};
