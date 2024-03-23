"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from ".";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import useLongPress from "./useLongPress";

const MenuBurgerButton = () => {
  const [menu, setMenu] = useState(false);
  const { data: session } = useSession();

  const openMenu = () => {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
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

  useEffect(() => {
    async function handleSession() {
      // Ensure we have the latest session data
      const currentSession = await getSession();
      if (currentSession?.expires) {
        const expiryDate = new Date(currentSession.expires);
        if (expiryDate <= new Date()) {
          await signOut({ redirect: false, callbackUrl: "/" });
        }
      }
    }
    handleSession();
  }, []);

  const onLongPress = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, openMenu, defaultOptions);

  return (
    <div className="mr-auto flex-1 md:hidden">
      <button type="button" {...longPressEvent}>
        <Image
          className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
          src={menu ? "/icons/close.svg" : "/icons/menu-burger.svg"}
          alt="menu"
          width={30}
          height={30}
        />
      </button>
      <div
        style={{ left: menu ? "0" : "-100vw", backdropFilter: "blur(10px)" }}
        // className="relative border border-gray-200 bg-white bg-opacity-60 bg-clip-padding px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20"
        className="fixed top-[58px] z-20 flex h-[calc(100dvh-50px)]  w-screen items-center justify-center bg-black bg-opacity-50 bg-clip-padding px-4 py-10 shadow-lg ring-1 ring-white/5 duration-300 ease-in-out "
      >
        <ul className="flex w-full flex-col gap-1 text-center">
          <Link
            onClick={openMenu}
            href="/"
            className="duration-200 group-hover:scale-110"
          >
            <li className=" group w-full overflow-hidden border-b-2  border-gray-400 p-4 text-2xl  font-black uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
              Home
            </li>
          </Link>
          {session?.user?.name === "Admin" && (
            <Link
              onClick={openMenu}
              href="/dashboard"
              className="duration-200 group-hover:scale-110"
            >
              <li className=" group w-full overflow-hidden border-b-2  border-gray-400 p-4 text-2xl  font-black uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
                dashboard
              </li>
            </Link>
          )}
          <Link
            onClick={openMenu}
            href="/about"
            className="duration-200 group-hover:scale-110"
          >
            <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl font-black uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
              About
            </li>
          </Link>
          <Link
            onClick={openMenu}
            href="/shop"
            className="duration-200 group-hover:scale-110"
          >
            <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl font-black uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
              Shop
            </li>
          </Link>
          <Link
            onClick={openMenu}
            href="/shop"
            className="duration-200 group-hover:scale-110"
          >
            <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl font-black uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
              categories
            </li>
          </Link>
          <Link
            onClick={openMenu}
            href="/cart"
            className="duration-200 group-hover:scale-110"
          >
            <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl font-black uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
              Cart
            </li>
          </Link>
          <Link
            onClick={openMenu}
            href="/favorites"
            className="duration-200 group-hover:scale-110"
          >
            <li className=" group w-full overflow-hidden border-b-2 border-gray-400 p-4 text-2xl font-black uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300 ">
              Favorites
            </li>
          </Link>
          <ThemeSwitcher
            className="group inline-flex w-full items-center justify-center gap-1 overflow-hidden border-b-2 border-gray-400 p-4 text-2xl font-black uppercase text-white duration-200 hover:bg-primary_color hover:text-gray-300"
            additionalFunction={openMenu}
          />
        </ul>
      </div>
    </div>
  );
};

export default MenuBurgerButton;
