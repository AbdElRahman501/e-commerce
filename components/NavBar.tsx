import Image from "next/image";
import Link from "next/link";
import { MenuBurgerButton, ThemeSwitcher } from ".";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-30 flex max-h-16 justify-center bg-primary_color px-5 py-3 dark:bg-primary_color md:bg-white md:px-20 ">
      <MenuBurgerButton />
      <Link href="/" className=" md:flex-1">
        <Image
          src="/logo.svg"
          alt="logo"
          width={150}
          height={100}
          className="h-8 invert-0 dark:invert-0 md:invert"
        />
      </Link>
      <div className=" hidden max-w-md flex-1 justify-center md:flex">
        <Link
          className="mr-auto uppercase text-black  hover:text-gray-300 dark:text-white"
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
          className="ml-auto uppercase text-black hover:text-gray-300 dark:text-white"
          href="/shop"
        >
          Shop
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 md:gap-8 ">
        <ThemeSwitcher className=" text-black hover:text-gray-300 dark:text-white md:flex" />
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