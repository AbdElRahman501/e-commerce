import { FormInput } from "@/types";

const formInputs: FormInput[] = [
  // {
  //   label: "Phone Number",
  //   type: "text",
  //   placeholder: "Enter your phone number",
  //   name: "phoneNumber",
  //   required: true,
  //   pattern: "(010|011|012|015)[0-9]{8}",
  // },
  // {
  //   label: "State",
  //   type: "select",
  //   options: ["Alabama", "Alaska", "Arizona", "Arkansas"],
  //   placeholder: "Choose your state",
  //   name: "state",
  //   required: true,
  // },
  {
    label: "Street Address",
    type: "text",
    placeholder: "Street address",
    name: "streetAddress",
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  {
    label: "Comment",
    type: "textarea",
    placeholder: "Add a comment",
    name: "comment",
    maxLength: 500,
  },
  {
    label: "Payment Method",
    type: "fieldset",
    placeholder: "Cash on delivery",
    options: ["Cash on delivery (COD)"],
    required: true,
    name: "paymentMethod",
  },
  // {
  //   label: "Promo Code",
  //   type: "text",
  //   placeholder: "Enter your promo code",
  //   name: "promoCode",
  // },
];
const productInputs: FormInput[] = [
  {
    label: "Price",
    type: "number",
    placeholder: "Enter product price",
    name: "price",
    required: true,
  },
  {
    label: "Min Price",
    type: "number",
    placeholder: "Enter product min price",
    name: "minPrice",
    required: true,
  },
  {
    label: "Title",
    type: "text",
    placeholder: "Enter product title",
    name: "title",
    required: true,
  },
  {
    label: "Name",
    type: "text",
    placeholder: "Enter product name",
    name: "name",
    required: true,
  },
  {
    label: "Keywords",
    type: "text",
    placeholder: "Enter keywords",
    name: "keywords",
    required: true,
  },
  {
    label: "Categories",
    type: "text",
    placeholder: "Enter product categories",
    name: "categories",
    required: true,
  },

  {
    label: "Description",
    type: "textarea",
    placeholder: "Enter product description",
    name: "description",
    required: true,
  },

  {
    label: "Gender",
    type: "select",
    placeholder: "Enter gender (male/female /all)",
    name: "gender",
    options: ["male", "female", "all"],
    required: true,
  },
  {
    label: "Quantity",
    type: "number",
    placeholder: "Enter product quantity",
    name: "quantity",
    required: true,
  },
];

export { productInputs, formInputs };
