import { FilterData } from "@/types";
import products from "./products";
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
    { name: "Anime", count: 32, checked: false },
    { name: "Quotes", count: 24, checked: false },
    { name: "Nature", count: 26, checked: true },
    { name: "Wildlife", count: 5, checked: false },
    { name: "Painted", count: 11, checked: false },
    { name: "Vintage", count: 2, checked: false },
    { name: "Retro", count: 37, checked: false },
    { name: "Graphic", count: 20, checked: false },
    { name: "Pets", count: 10, checked: false },
    { name: "Music", count: 13, checked: false },
    { name: "Sports", count: 9, checked: false },
    { name: "Gaming", count: 9, checked: false },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  colors: ["#12355b", "#420039", "#d72638", "#ffffff", "#ff570a"],
};

export { products, categories, faqSection, filterData, footerList };
