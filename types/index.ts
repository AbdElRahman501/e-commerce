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
  gender: "male" | "female" | "all";
  quantity: number;
  likes: number;
  updatedAt: string;
  views?: number;
  sales?: number;
  minPrice: number;
  content: Record<
    string,
    {
      title?: string;
      list?: string[];
      images?: string[];
      description?: string;
    }[]
  >;
}

export interface ProductOnSaleType extends Product {
  salePrice: number | null;
  saleValue: number | null;
}

export interface OfferType {
  title: string;
  description: string;
  sale: number;
  category: string;
  image: string;
  url: string;
}

export interface CollectionType {
  _id: string;
  name: string;
  image: string;
  url: string;
}

export interface GovernorateType {
  id: string;
  governorate_name_en: string;
  shipping_price: number;
}

export interface CityType {
  id: string;
  governorate_id: string;
  city_name_en: string;
  shipping_price: number;
}

export interface PromoCodeType {
  code: string;
  discount: number;
  limit: number;
  active: boolean;
  maxDiscount: number;
  _id: string;
}
export interface SubscriberType {
  email: string;
  _id: string;
}
export interface StoryType {
  _id: string;
  image: string;
  start?: string;
  end?: string;
  url?: string;
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

export interface CartProduct extends ProductOnSaleType {
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

export interface FormInput {
  label?: string;
  options?: string[];
  type: string;
  placeholder?: string;
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
  messageAccept?: boolean;
  email?: string;
  streetAddress: string;
  state: string;
  city: string;
  comment?: string;
  promoCode?: string;
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
  createdAt: string;
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

export interface NavbarType {
  title: string;
  main?: boolean;
  url: string;
}
export interface ReviewType {
  _id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
  images: string[];
}
