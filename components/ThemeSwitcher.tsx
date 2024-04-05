"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeSwitcherProps } from "@/types";
import Circum_icon from "./icons/Circum_icon";
import SunIcon from "./icons/SunIcon";

const ThemeSwitcher = ({
  className,
  additionalFunction,
  onlyIcon = false,
}: ThemeSwitcherProps) => {
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
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        additionalFunction && additionalFunction();
      }}
    >
      {!onlyIcon && <p>{theme === "dark" ? "Light mode" : "Dark mode"}</p>}
      {theme === "dark" ? (
        <Circum_icon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
};
export default ThemeSwitcher;
