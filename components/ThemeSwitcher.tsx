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
    return (
      <div className={className}>
        <Circum_icon className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div
      className={className}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        additionalFunction && additionalFunction();
      }}
    >
      {!onlyIcon && <p>{theme === "dark" ? "Light mode" : "Dark mode"}</p>}
      {theme === "dark" ? (
        <Circum_icon className="h-8 w-8" />
      ) : (
        <SunIcon className="h-8 w-8" />
      )}
    </div>
  );
};
export default ThemeSwitcher;
