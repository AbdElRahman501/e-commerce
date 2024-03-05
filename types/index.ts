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
  additionalFunction?: () => void;
  onlyIcon?: boolean;
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
  params: {
    id: string;
  };
  searchParams: {
    c?: string;
  };
}

export interface CartProduct extends Product {
  amount: number;
  selectedColor: string;
  selectedSize: string;
}

export interface StoreContextType {
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  favorite: string[];
  setFavorite: React.Dispatch<React.SetStateAction<string[]>>;
  order: Order | null;
  setOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}

export interface FormInput {
  label: string;
  options?: string[];
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  state: string;
  comment: string;
  promoCode: string;
  paymentMethod: string;
}

export interface Order {
  products: CartProduct[];
  personalInfo: PersonalInfo;
  id: string;
  total: number;
  subTotal: number;
  shipping: number;
  discount: number;
}
