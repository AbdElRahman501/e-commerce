import {
  DashboardCardProps,
  FilterData,
  FilterType,
  Order,
  PersonalInfo,
} from "@/types";
import products from "./products";
import { formInputs, productInputs } from "./inputs";
const footerList = [
  {
    title: "About Us",
    links: [
      {
        name: "Our Story",
        url: "/about",
      },
      {
        name: "Mission and Values",
        url: "/about",
      },
      {
        name: "Team",
        url: "/about",
      },
    ],
  },
  {
    title: "Shop",
    links: [
      {
        name: "All Products",
        url: "/shop",
      },
      {
        name: "New Arrivals",
        url: "/shop",
      },
      {
        name: "Sale",
        url: "/shop",
      },
    ],
  },
  {
    title: "Social Media",
    links: [
      {
        name: "Instagram",
        url: "https://www.instagram.com/givaco.eg",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=100084787940589",
      },
      // {
      //   name: "Twitter",
      //   url: "https://twitter.com/yourstore",
      // },
    ],
  },
];

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Trending",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  }, // asc
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

const categories = [
  {
    name: "Funny Prints",
    url: "#",
  },
  {
    name: "Graphic Designs",
    url: "#",
  },
  {
    name: "Quotes and Sayings",
    url: "#",
  },
  {
    name: "Custom Prints",
    url: "#",
  },
  {
    name: "Animal Prints",
    url: "#",
  },
  {
    name: "Nature Inspired",
    url: "#",
  },
  {
    name: "Abstract Art",
    url: "#",
  },
  {
    name: "Music and Bands",
    url: "#",
  },
];

const faqSection = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, simply visit our online store, browse the products, and add the desired items to your cart. Follow the checkout process to complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards and PayPal. You can find the available payment options during the checkout process.",
  },
  {
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "Once an order is placed, it enters our processing system quickly. Unfortunately, we cannot guarantee modifications or cancellations. Please double-check your order before completing the purchase.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this tracking number on our website or the carrier's site to monitor the status of your delivery.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Our return policy allows you to return items within 30 days of purchase. Please review our detailed return policy on the website for information on eligibility and the return process.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "For any questions or concerns, you can reach our customer support team through the 'Contact Us' page on our website or by emailing support@example.com. We aim to respond to inquiries promptly.",
  },
];
const filterData: FilterData = {
  origin: ["Sale", "New", "A hit Sale"],
  categories: [
    { name: "Anime", count: 32 },
    { name: "Quotes", count: 24 },
    { name: "Nature", count: 26 },
    { name: "Wildlife", count: 5 },
    { name: "Painted", count: 11 },
    { name: "Vintage", count: 2 },
    { name: "Retro", count: 37 },
    { name: "Graphic", count: 20 },
    { name: "Pets", count: 10 },
    { name: "Music", count: 13 },
    { name: "Sports", count: 9 },
    { name: "Gaming", count: 9 },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  colors: ["#12355b", "#420039", "#d72638", "#ffffff", "#ff570a"],
};

const filterInitialData: FilterType = {
  selectedCategories: [],
  originFilter: [],
  colorFilter: [],
  keywordFilter: "",
  sizeFilter: [],
  minPrice: 0,
  maxPrice: 100000,
  genderFilter: "all",
};
const dashboardCards: DashboardCardProps[] = [
  {
    image: "/icons/order.svg",
    title: "Orders",
    number: "10",
    description: "+2",
    url: "/orders",
  },
  {
    image: "/icons/revenue.svg",
    title: "Revenue",
    number: "$1,200.59",
    url: "#",
    description: "+$150",
  },
  {
    image: "/icons/sales.svg",
    title: "Sales",
    number: "$5,000",
    url: "#",
    description: "+$2,000",
  },
  {
    image: "/icons/customers.svg",
    title: "Customers",
    number: "20",
    url: "#",
  },
  {
    image: "/icons/subscribers.svg",
    title: "Subscribers",
    number: "100",
    url: "#",
    description: "+2",
  },
  {
    image: "/icons/visits.svg",
    title: "Visits",
    number: "100",
    url: "#",
    description: "+20",
  },
  {
    image: "/icons/review.svg",
    title: "Reviews",
    number: "3.8",
    url: "#",
    description: "-0.1",
  },
  {
    image: "/icons/products.svg",
    title: "Products",
    number: "100",
    url: "/products",
  },
];
export {
  dashboardCards,
  filterInitialData,
  products,
  categories,
  faqSection,
  filterData,
  formInputs,
  footerList,
  productInputs,
};
