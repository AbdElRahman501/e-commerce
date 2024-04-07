import Link from "next/link";
import { CartButton, MenuBurgerButton, ThemeSwitcher } from ".";
import LogoIcon from "./icons/LogoIcon";
import HeartIcon from "./icons/HeartIcon";
import { fetchNavbarLinks } from "@/lib/actions/store.actions";

const NavBar = async () => {
  const navbarLinks = await fetchNavbarLinks();
  const mainNav = navbarLinks.filter((link) => link.main);
  return (
    <nav className="sticky -top-[1px] z-30 flex max-h-16 justify-center bg-primary_color px-5 py-3 dark:bg-primary_color md:bg-white md:px-20 ">
      <MenuBurgerButton navbarLinks={navbarLinks} />
      <Link href="/" className=" md:flex-1">
        <LogoIcon className="w-16 fill-white md:fill-black md:dark:fill-white" />
      </Link>
      <div className=" hidden max-w-md flex-1 items-center justify-center md:flex">
        {mainNav.map((link, index) => (
          <Link
            key={index}
            className="mr-auto font-semibold uppercase text-black  duration-200 hover:scale-110 dark:text-white"
            href={link.url}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 md:gap-8 ">
        <ThemeSwitcher
          className="hidden text-black duration-200 hover:scale-110 dark:text-white md:flex"
          onlyIcon
        />
        <CartButton />
        <Link href="/favorites">
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
