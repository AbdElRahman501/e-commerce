"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const MenuBurgerButton = () => {
  const [menu, setMenu] = useState(false);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const openMenu = () => {
    if (menu) {
      document.body.classList.remove("scroll-Lock");
      setMenu(false);
    } else {
      document.body.classList.add("scroll-Lock");
      setMenu(true);
    }
  };

  return (
    <div className="mr-auto flex-1 md:hidden">
      <button type="button" onClick={openMenu}>
        <Image
          className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
          src={"/icons/menu-burger.svg"}
          alt="menu"
          width={30}
          height={30}
        />
      </button>
      <div
        style={{ left: menu ? "0" : "-100vw", backdropFilter: "blur(10px)" }}
        // className="relative border border-gray-200 bg-white bg-opacity-60 bg-clip-padding px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20"
        className="fixed top-[58px] z-20 flex h-[calc(100dvh-50px)] w-screen items-center justify-center bg-black bg-opacity-50 bg-clip-padding px-4 py-10 shadow-lg ring-1 ring-white/5 duration-300 ease-in-out "
      >
        <ul className="flex w-full flex-col gap-1 text-center">
          <li className=" group w-full overflow-hidden border-b-2  border-gray-400 p-4 text-2xl uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
            <Link
              onClick={openMenu}
              href="/"
              className="duration-200 group-hover:scale-110"
            >
              Home
            </Link>
          </li>
          <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
            <Link
              onClick={openMenu}
              href="/about"
              className="duration-200 group-hover:scale-110"
            >
              About
            </Link>
          </li>
          <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
            <Link
              onClick={openMenu}
              href="/shop"
              className="duration-200 group-hover:scale-110"
            >
              Shop
            </Link>
          </li>
          <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
            <Link
              onClick={openMenu}
              href="/shop"
              className="duration-200 group-hover:scale-110"
            >
              categories
            </Link>
          </li>
          <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
            <Link
              onClick={openMenu}
              href="/cart"
              className="duration-200 group-hover:scale-110"
            >
              Cart
            </Link>
          </li>
          <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
            <Link
              onClick={openMenu}
              href="/favorites"
              className="duration-200 group-hover:scale-110"
            >
              Favorites
            </Link>
          </li>
          <li className="group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                openMenu();
              }}
              className="inline-flex items-center gap-1 duration-200 group-hover:scale-110"
            >
              <Image
                className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
                src={theme === "dark" ? "/icons/sun.svg" : "/icons/circum.svg"}
                alt="moon"
                width={30}
                height={30}
              />{" "}
              <p>{theme === "dark" ? "Light mode" : "Dark mode"}</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBurgerButton;
