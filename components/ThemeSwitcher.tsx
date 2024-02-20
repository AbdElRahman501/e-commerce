"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ThemeSwitcherProps } from "@/types";

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={className}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Image
          className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
          src={"/icons/circum.svg"}
          alt="moon"
          width={24}
          height={24}
        />
      ) : (
        <Image
          className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
          src={"/icons/sun.svg"}
          alt="sun"
          width={24}
          height={24}
        />
      )}
    </button>
  );
};
export default ThemeSwitcher;
