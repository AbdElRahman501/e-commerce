"use server";
import Link from "next/link";
import { CartButton, MenuBurgerButton, ThemeSwitcher } from ".";
import LogoIcon from "./icons/LogoIcon";
import HeartIcon from "./icons/HeartIcon";
import { fetchNavbarLinks } from "@/lib/actions/store.actions";
import DashBoardHomeLink from "./DashBoardHomeLink";
import { cookies } from "next/headers";
import { CartItem } from "@/types";

const NavBar = async () => {
  const navbarLinks = await fetchNavbarLinks();
  const mainNav = navbarLinks.filter((link) => link.main);
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  return (
    <nav className="sticky -top-[1px] z-30 flex max-h-16 items-center justify-center gap-4 bg-primary_color px-5 py-3 dark:bg-primary_color md:bg-white md:px-20 ">
      <MenuBurgerButton cart={cart} navbarLinks={navbarLinks} />
      <Link href="/" className=" md:flex-1">
        <LogoIcon className="w-16 fill-white md:fill-black md:dark:fill-white" />
      </Link>
      <div className=" hidden max-w-md flex-1 items-center justify-center gap-4 md:flex">
        {mainNav.map((link, index) => (
          <Link
            key={index}
            className="mr-auto font-semibold uppercase text-black  duration-200 hover:scale-110 dark:text-white"
            href={link.url}
          >
            {link.title}
          </Link>
        ))}
        <DashBoardHomeLink />
      </div>
      <div className="flex flex-1 items-center justify-end md:gap-6 ">
        <ThemeSwitcher
          className="hidden p-2 text-black duration-200 hover:scale-110 dark:text-white md:flex"
          onlyIcon
        />
        <CartButton cart={cart} />
        <Link href="/favorites" aria-label="favorites link" className="p-2">
          <HeartIcon
            fillRule="evenodd"
            clipRule="evenodd"
            className="h-8 w-8 fill-white duration-200 hover:scale-110 md:fill-black md:dark:fill-white "
          />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
