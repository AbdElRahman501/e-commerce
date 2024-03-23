import React from "react";

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
  categories: { name: string; count: number }[];
  sizes: string[];
  colors: string[];
}

export interface Product {
  id: string;
  title: string;
  keywords: string;
  images: Record<string, string[]>; // Mapping color to image filename
  categories: string;
  price: number;
  sizes: string[];
  colors: string[];
  description: string;
  name: string;
  gender: "male" | "female";
  quantity: number;
  likes: number;
  views?: number;
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
}

export interface CartProduct extends Product {
  amount: number;
  selectedColor: string;
  selectedSize: string;
}

export interface CartItem {
  productId: string;
  amount: number;
  selectedColor: string;
  selectedSize: string;
}

export interface StoreContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  favorite: string[];
  setFavorite: React.Dispatch<React.SetStateAction<string[]>>;
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
  products: CartItem[];
  personalInfo: PersonalInfo;
  id: string;
  total: number;
  subTotal: number;
  shipping: number;
  discount: number;
}

export interface FilterType {
  selectedCategories?: string[];
  originFilter?: string[];
  colorFilter?: string[];
  keywordFilter?: string;
  sizeFilter?: string[];
  minPrice?: number;
  maxPrice?: number;
  genderFilter?: "male" | "female" | "all";
}

export interface FilterProps extends FilterType {
  query?: string;
  limit?: number;
  sort?: string;
}
export interface CategoryCount {
  name: string;
  count: number;
}
export interface DashboardCardProps {
  image: string;
  title: string;
  number: string;
  description?: string;
  url: string;
}
