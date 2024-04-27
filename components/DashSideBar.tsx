"use client";
import { dashboardCards } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashSideBar = () => {
  const [menu, setMenu] = React.useState(false);

  const openMenu = () => {
    setMenu((pv) => !pv);
  };

  return (
    <>
      <div
        onClick={openMenu}
        className="fixed left-0 top-0 z-[9999] m-1 h-14 w-14 bg-primary_color md:hidden"
      >
        <Image
          className="m-auto h-14 invert dark:invert"
          src={"/icons/menu-burger.svg"}
          alt="menu"
          width={30}
          height={30}
        />
      </div>
      <div
        style={{ left: menu ? "0" : "-100vw" }}
        className="scroll-bar-hidden  fixed top-[60px] z-20 h-[calc(100dvh-60px)] w-screen justify-start overflow-y-auto bg-white p-4 duration-300 ease-in-out dark:bg-black md:sticky md:w-1/4 md:bg-primary_bg md:text-white"
      >
        <ul className="flex h-full w-full flex-col gap-1 text-left">
          {dashboardCards.map((link, index) => (
            <Link
              key={index}
              onClick={openMenu}
              href={"/dashboard" + link.url}
              className="duration-200 group-hover:scale-110"
            >
              <li className="w-full overflow-hidden border-b  border-gray-200 p-4 uppercase duration-200 hover:bg-primary_color hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-black  ">
                <Image
                  src={link.image}
                  width={24}
                  height={24}
                  alt={`${link.title} icon`}
                  className="inline-block object-contain"
                />
                <p className="ml-2 inline-block">{link.title}</p>
              </li>
            </Link>
          ))}

          <Link
            onClick={openMenu}
            href={"/dashboard/store/collections"}
            className="duration-200 group-hover:scale-110"
          >
            <li className="w-full overflow-hidden border-b  border-gray-200 p-4 uppercase duration-200 hover:bg-primary_color hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-black  ">
              collections
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default DashSideBar;
