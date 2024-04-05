"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from ".";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import useLongPress from "./useLongPress";
import { navbarLinks } from "@/constants";

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
        style={{ left: menu ? "0" : "-100vw" }}
        className="fixed top-[58px] z-20 flex h-[calc(100dvh-50px)]  w-screen justify-start bg-white p-4 duration-300 ease-in-out dark:bg-black "
      >
        <ul className="flex w-full flex-col gap-1 text-left">
          {navbarLinks.map((link, index) => (
            <Link
              key={index}
              onClick={openMenu}
              href={link.url}
              className="duration-200 group-hover:scale-110"
            >
              <li className="w-full overflow-hidden border-b  border-gray-200 p-4 uppercase duration-200 hover:bg-primary_color hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-black  ">
                {link.title}
              </li>
            </Link>
          ))}
          {session?.user?.name === "Admin" && (
            <Link
              onClick={openMenu}
              href="/dashboard"
              className="duration-200 group-hover:scale-110"
            >
              <li className="w-full overflow-hidden border-b  border-gray-200 p-4 uppercase duration-200 hover:bg-primary_color hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-black  ">
                dashboard
              </li>
            </Link>
          )}
          <ThemeSwitcher
            className=" group inline-flex w-full items-center justify-start gap-1 overflow-hidden border-b  border-gray-200 p-4 uppercase duration-200 hover:bg-primary_color hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-black  "
            // className="group inline-flex w-full items-center justify-center gap-1 overflow-hidden border-b-2 border-gray-400 p-4 font-black uppercase  duration-200 hover:bg-primary_color "
            additionalFunction={openMenu}
          />
        </ul>
      </div>
    </div>
  );
};

export default MenuBurgerButton;
