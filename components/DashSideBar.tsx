"use client";
import { dashboardCards } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import DropDown_icon from "./icons/DropDown_icon";

const DashSideBar = () => {
  const [menu, setMenu] = React.useState(false);
  const [minMenu, setMinMenu] = React.useState(false);

  const openMenu = () => {
    setMenu((pv) => !pv);
    setMinMenu((pv) => false);
  };

  useEffect(() => {
    if (menu) {
      document.body.classList.add("scroll-Lock");
    } else {
      document.body.classList.remove("scroll-Lock");
    }
    return () => {
      document.body.classList.remove("scroll-Lock");
    };
  }, [menu]);
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
        style={{
          left: menu ? "0" : "-100vw",
        }}
        className="scroll-bar-hidden fixed top-[60px] z-20 h-[calc(100dvh-60px)] w-screen justify-start overflow-y-auto bg-white p-4 transition-all duration-300 ease-in-out dark:bg-black md:sticky md:w-fit md:bg-primary_bg md:text-white"
      >
        <ul className="flex h-full w-full flex-col gap-1 text-left">
          <div
            onClick={() => setMinMenu(!minMenu)}
            className="hidden cursor-pointer duration-200 group-hover:scale-110 md:block"
          >
            <li className="flex w-full justify-end overflow-hidden border-b border-gray-200 p-4 uppercase duration-200 hover:bg-primary_color hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-black  ">
              <DropDown_icon className=" w-6 rotate-[90deg] " />
            </li>
          </div>

          {dashboardCards.map((link, index) => (
            <Link
              key={index}
              onClick={openMenu}
              href={"/dashboard" + link.url}
              className="duration-200 group-hover:scale-110"
            >
              <li className="w-full  overflow-hidden border-b border-gray-200 p-4 uppercase duration-200 hover:bg-primary_color hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-black  ">
                <Image
                  src={link.image}
                  width={24}
                  height={24}
                  alt={`${link.title} icon`}
                  className="inline-block object-contain"
                />
                {!minMenu && <p className="ml-2 inline-block">{link.title}</p>}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DashSideBar;
