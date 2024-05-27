export interface ArrowButtonProps {
  className?: string;
  href?: string;
}

export interface FooterType {
  title: string;
  links: {
    name: string;
    url: string;
  }[];
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
export interface SortFilterItem {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
}

export interface VariationOption {
  name: string;
  priceAdjustment: number;
  minPriceAdjustment: number;
  imageUrl?: string; // Optional, only for color variations
  subVariations: Variation[]; // Optional, for nested variations relative to this option
  parentType?: string;
  parentName?: string;
}

export interface Variation {
  type: string;
  options: VariationOption[];
}

export interface Product {
  id: string;
  title: string;
  keywords: string;
  images: Record<string, string[]>; // Mapping color to image filename
  categories: string;
  price: number;
  description: string;
  name: string;
  gender: "male" | "female" | "all";
  quantity: number;
  likes: number;
  updatedAt: string;
  createdAt: string;
  collections: string[];
  variations: Variation[];
  views?: number;
  sales?: number;
  minPrice: number;
  content: { name: string; html: string }[];
}

export interface CustomActionType {
  key: string;
  Action: (item: any) => JSX.Element;
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
  active: boolean;
  url: string;
  _id: string;
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
  selectedOptions: Record<string, string>;
}

export interface CartItem {
  productId: string;
  amount: number;
  selectedOptions: Record<string, string>;
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
  onChange?: (e: any) => void;
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  min?: number;
  max?: number;
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
  status: "Pending" | "Delivered" | "Shipped" | "Accepted" | "Canceled";
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
  minLimit?: number;
  idsToExclude?: string[];
  containMainProduct?: boolean;
}
export interface CategoryCount {
  name: string;
  count: number;
}
export interface DashboardCardProps {
  image: string;
  title: string;
  number: string | number;
  description?: string | number;
  url?: string;
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

export type SubscriptionState = "subscribed" | "ignored" | "unsubscribed";
