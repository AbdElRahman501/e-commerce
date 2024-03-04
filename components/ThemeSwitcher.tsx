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
      <Image
        className="invert duration-300  hover:scale-110 dark:invert md:invert-0"
        src={theme === "dark" ? "/icons/sun.svg" : "/icons/circum.svg"}
        alt="moon"
        width={30}
        height={30}
      />{" "}
    </button>
  );
};
export default ThemeSwitcher;
