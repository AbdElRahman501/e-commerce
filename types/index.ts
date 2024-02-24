import React, { MouseEventHandler } from "react";

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

export interface Product {
  id: string;
  title: string;
  keywords: string;
  reviews: Review[];
  images: Record<string, string>; // Mapping color to image filename
  categories: string;
  price: number;
  sizes: string[];
  colors: string[];
  description: string;
  name: string;
  quantity: number;
  likes: number;
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
}

export interface ProductDetailPageProps {
  searchParams: {
    id: string;
  };
}

export interface CartProduct extends Product {
  amount: number;
  selectedColor: string;
  selectedSize: string;
}

export interface CartContextType {
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}
