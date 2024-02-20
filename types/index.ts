import { MouseEventHandler } from "react";

// export interface CustomButtonProps {
//   title: string;
//   containerStyles?: string;
//   handleClick?: MouseEventHandler<HTMLButtonElement>;
//   btnType?: "button" | "submit" | "reset";
// }
// export interface CustomFilterProps {
//   title: string;
//   containerStyles?: string;
// }

// export interface SearchManufacturerProps {
//   manufacturer: string;
//   setManufacturer: (manufacturer: string) => void;
// }

export interface ArrowButtonProps {
  className?: string;
  href: string;
}

export interface SectionTitleProps {
  title: string;
  url: string;
  className?: string;
  theme?: string;
}

export interface ThemeSwitcherProps {
  className?: string;
}

export interface FilterData {
  origin: string[];
  categories: { name: string; count: number; checked: boolean }[];
  sizes: string[];
  colors: string[];
}
