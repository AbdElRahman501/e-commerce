import Image from "next/image";
import Link from "next/link";
import { MenuBurgerButton, ThemeSwitcher } from ".";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-30 flex max-h-16 justify-between bg-primary_color px-5 py-3 dark:bg-primary_color md:bg-white md:px-20 ">
      <MenuBurgerButton />
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={150}
          height={100}
          className="h-8 invert-0 dark:invert-0 md:invert"
        />
      </Link>
      <div className="max-ms:w-1/3 hidden gap-10 md:flex">
        <Link
          className="uppercase text-black  hover:text-gray-300 dark:text-white"
          href="/"
        >
          Home
        </Link>
        <Link
          className="uppercase text-black hover:text-gray-300 dark:text-white"
          href="/about"
        >
          About
        </Link>
        <Link
          className="uppercase text-black hover:text-gray-300 dark:text-white"
          href="/shop"
        >
          Shop
        </Link>
      </div>
      <div className="relative flex items-center gap-2 md:gap-10 ">
        <ThemeSwitcher className="absolute -left-8 text-black hover:text-gray-300 dark:text-white md:flex" />
        <Link href="/cart">
          <Image
            className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
            src={"/icons/cart.svg"}
            alt="heart"
            width={30}
            height={30}
          />
        </Link>
        <Link
          className="uppercase text-black hover:text-gray-300 dark:text-white"
          href="/favorites"
        >
          <Image
            className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
            src={"/icons/heart.svg"}
            alt="heart"
            width={30}
            height={30}
          />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
