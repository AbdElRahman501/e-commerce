import { FormInput } from "@/types";

const formInputs: FormInput[] = [
  {
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email address",
    name: "email",
    required: true,
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
  },
  {
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number",
    name: "phoneNumber",
    required: true,
    pattern: "(010|011|012|015)[0-9]{8}",
  },
  {
    label: "State",
    type: "select",
    options: ["Alabama", "Alaska", "Arizona", "Arkansas"],
    placeholder: "Choose your state",
    name: "state",
    required: true,
  },
  {
    label: "Street Address",
    type: "text",
    placeholder: "Enter your street address",
    name: "streetAddress",
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  {
    label: "Comment",
    type: "textarea",
    placeholder: "Use this space to add notes about your events",
    name: "comment",
    maxLength: 500,
  },
  {
    label: "Payment",
    type: "checkbox",
    placeholder: "Cash on delivery",
    options: ["Cash on delivery", "Online payment"],
    required: true,
    name: "paymentMethod",
  },
  {
    label: "Promo Code",
    type: "text",
    placeholder: "Enter your promo code",
    name: "promoCode",
  },
];

export default formInputs;
