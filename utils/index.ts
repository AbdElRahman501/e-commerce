import {
  CartItem,
  OfferType,
  Order,
  PersonalInfo,
  Product,
  ProductOnSaleType,
  Variation,
} from "@/types";
import formatOrderItems from "./formatOrderItems";
import { ReadonlyURLSearchParams } from "next/navigation";

export function getAllImages(images: Record<string, string[]>) {
  let allImages: string[] = [];
  for (const color in images) {
    allImages = allImages.concat(images[color]);
  }
  return allImages;
}

export function getTransformedImageUrl(
  originalUrl: string | "",
  width: number,
  height: number,
) {
  if (
    originalUrl.includes("cloudinary.com") &&
    originalUrl.includes("/upload/")
  ) {
    const parts = originalUrl.split("/upload/");
    const transformation = `w_${width},h_${height},c_fit/`;
    const transformedUrl = parts[0] + "/upload/" + transformation + parts[1];
    return transformedUrl;
  } else {
    return originalUrl;
  }
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function getSalePrice(offers: OfferType[], product: Product) {
  const { categories, price, minPrice, keywords } = product;
  const matchingString =
    categories.toLowerCase() + " " + keywords.toLowerCase();
  let matchingSale = offers.find((sale) => {
    if (!sale.category) return false;
    const matching = matchingString.includes(sale.category.toLowerCase());
    return matching;
  });

  if (matchingSale) {
    let salePrice = Math.ceil(price - (price * matchingSale.sale) / 100);

    if (salePrice > minPrice) {
      return { salePrice, saleValue: matchingSale.sale };
    }
  }

  return { salePrice: null, saleValue: null };
}

export const sorProductPriceOffer = ({
  offers,
  products,
  ascending = true,
}: {
  offers: OfferType[];
  products: Product[];
  ascending?: boolean;
}) => {
  const sorter = products.sort((a: any, b: any) => {
    const salePriceA = getSalePrice(offers, a).salePrice;
    const salePriceB = getSalePrice(offers, b).salePrice;
    const modifiedPriceA = salePriceA !== null ? salePriceA : a.price;
    const modifiedPriceB = salePriceB !== null ? salePriceB : b.price;
    if (ascending) {
      return modifiedPriceA - modifiedPriceB;
    } else {
      return modifiedPriceB - modifiedPriceA;
    }
  });

  return sorter;
};

export const modifyProducts = (
  products: Product[],
  offers: OfferType[],
): ProductOnSaleType[] => {
  const modifiedProducts = products.map((product) => {
    const { salePrice, saleValue } = getSalePrice(offers, product);
    return { ...product, salePrice, saleValue };
  });
  return modifiedProducts;
};

export const checkIsInCart = (cart: CartItem[], cartItem: CartItem) => {
  if (!cart?.length || !cartItem) return false;
  const { productId, selectedOptions } = cartItem;
  const isInCart = cart.some(
    (item) =>
      item.productId === productId &&
      deepEqual(item.selectedOptions, selectedOptions),
  );

  return isInCart;
};

export const reformatCartItems = (
  cart: CartItem[],
  products: ProductOnSaleType[],
) => {
  if (!cart?.length || !products?.length) return [];
  const cartProducts = [];
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    const product = products.find(
      (product: ProductOnSaleType) => product.id === cartItem.productId,
    );
    if (product) {
      cartProducts.push({
        ...product,
        amount: cartItem.amount,
        selectedOptions: cartItem.selectedOptions,
      });
    }
  }

  return cartProducts;
};

export function generateCode(prefix: string, length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = prefix;
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

export function generateRandomCode(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const sections = [
    Array.from({ length: 4 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join(""),
    Array.from({ length: 4 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join(""),
    Array.from({ length: 2 }, () =>
      characters.charAt(Math.floor(Math.random() * 26)),
    ).join(""),
  ];
  return `WELCOME-${sections.join("-")}-15`;
}

export function formatDate(timestamp: string): string {
  const dt = new Date(timestamp);
  const year = dt.getFullYear().toString().slice(-2);
  const month = ("0" + (dt.getMonth() + 1)).slice(-2);
  const day = ("0" + dt.getDate()).slice(-2);

  return `${year}/${month}/${day}`;
}

export function formatPrice(price: number, currency: "EGP" | "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function checkDateStatus(
  startDate?: string,
  endDate?: string,
): { name: string; color: string } {
  if (!startDate || !endDate) {
    return { name: "active", color: "green" };
  }
  const currentDate: Date = new Date();
  const startDateObj: Date = new Date(startDate);
  const endDateObj: Date = new Date(endDate);

  if (startDateObj > currentDate) {
    return { name: "pending", color: "yellow" };
  } else if (startDateObj <= currentDate && currentDate <= endDateObj) {
    return { name: "active", color: "green" };
  } else {
    return { name: "passed", color: "red" };
  }
}

export function isFreeShipping(offers: OfferType[], subTotal: number) {
  const freeShippingMinValue: number = Number(
    offers.find((x) => x.title === "FREE_SHIPPING")?.description || 0,
  );
  if (!freeShippingMinValue) return false;
  if (subTotal - 50 > freeShippingMinValue) return true;
  return false;
}
export { formatOrderItems };

export function addToCart(cart: CartItem[], item: CartItem) {
  if (!cart || !item) return [];
  const { productId, amount, selectedOptions } = item;
  let isInCart = cart.some(
    (item) =>
      item.productId === productId &&
      deepEqual(item.selectedOptions, selectedOptions),
  );
  if (!isInCart) {
    const data = [
      ...cart,
      {
        productId,
        amount,
        selectedOptions,
      },
    ];
    return data;
  } else {
    return cart;
  }
}

export function editCart(
  cart: CartItem[],
  oldItem: CartItem,
  newItem: CartItem,
) {
  const data = cart.map((item) => {
    if (
      item.productId === oldItem.productId &&
      deepEqual(item.selectedOptions, oldItem.selectedOptions)
    ) {
      return newItem;
    }
    return item;
  });
  return data;
}

export function removeFromCart(cart: CartItem[], item: CartItem) {
  if (!cart || !item) return [];
  const { productId, selectedOptions } = item;
  const data = cart.filter((item) => {
    const matchItem =
      item.productId === productId &&
      deepEqual(item.selectedOptions, selectedOptions);

    if (matchItem) {
      return false;
    }
    return true;
  });
  return data;
}

export function toggleFavoriteItem(favorite: string[], id: string) {
  if (!favorite) return [];
  const data = favorite.find((item) => item === id)
    ? favorite.filter((item) => item !== id)
    : [...favorite, id];
  return data;
}

export function firstMatch(arr1?: string[], arr2?: string[]): string | null {
  if (!arr1 || !arr2) return null;
  for (const item1 of arr1) {
    for (const item2 of arr2) {
      if (item1 === item2) {
        return item1;
      }
    }
  }
  return null; // Return null if no match is found
}

export function checkDiscount({
  discount,
  minSubTotal,
  subTotal,
}: {
  discount: number;
  minSubTotal: number;
  subTotal: number;
}) {
  const discountPercentage = discount / 100;
  const discountValue = Math.ceil(discountPercentage * subTotal);
  if (discountValue > 0 && subTotal - discountValue > minSubTotal)
    return discountValue;
  return 0;
}
function parseInputType(type: string) {
  if (type.startsWith("!")) {
    const innerType = type.slice(1);
    return { type: innerType, required: true };
  } else {
    return { type, required: false };
  }
}

export function parseListString(type: string) {
  const prefix = "LIST:";
  if (type.startsWith(prefix)) {
    const values = type.slice(prefix.length).split(",");
    return { type: "select", options: values.map((value) => value.trim()) };
  }
  return { type, options: [] };
}

export function createInputArray(inputObj: any) {
  const inputArray = [];
  for (const key in inputObj) {
    const { type: initialType, required } = parseInputType(inputObj[key]);
    const { type, options } = parseListString(initialType);
    inputArray.push({
      label: key,
      type: type,
      placeholder: `Enter ${key}`,
      name: key,
      options: options,
      required: required,
    });
  }
  return inputArray;
}

export const getRevenue = (orders: Order[], products: ProductOnSaleType[]) => {
  if (!orders || !products) return 0;
  let revenue = 0;
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const cart = order.products;
    const cartProducts = reformatCartItems(cart, products);
    const subTotal = order.subTotal;
    const minSubTotal = cartProducts.reduce(
      (acc, item) => acc + item.minPrice * item.amount,
      0,
    );
    revenue += subTotal - order.discount - minSubTotal;
  }
  return revenue;
};

type Customer = PersonalInfo & { count: number; alternativeEmails: string[] };

export function findUniqueCustomers(customers: PersonalInfo[]) {
  let uniqueCustomers: Customer[] = [];

  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];
    if (uniqueCustomers.find((c) => c.phoneNumber === customer.phoneNumber)) {
      uniqueCustomers = uniqueCustomers.map((c) => {
        const subEmails = c.alternativeEmails.filter(
          (email) =>
            email?.toLocaleLowerCase() !== customer.email?.toLocaleLowerCase(),
        );
        const alternativeEmails = customer.email
          ? [...subEmails, customer.email]
          : subEmails;
        return c.phoneNumber === customer.phoneNumber
          ? {
              ...c,
              count: c.count + 1,
              alternativeEmails,
            }
          : c;
      });
    } else {
      uniqueCustomers.push({ ...customer, count: 1, alternativeEmails: [] });
    }
  }

  return uniqueCustomers;
}

export const orderStatusColor = (
  status: "Pending" | "Delivered" | "Shipped" | "Accepted" | "Canceled",
) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Delivered":
      return "text-green-500";
    case "Canceled":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

function formatDayDate(date: Date) {
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var dayOfWeek = date.getDay();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var formattedDate =
    weekdays[dayOfWeek] + " - " + day + "/" + month + "/" + year;

  return formattedDate;
}

export function getNextWorkingDay(startDate: string | Date, days: number) {
  var currentDate = new Date(startDate);
  for (var i = 0; i < days; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate.getDay() === 5) {
      // Friday
      currentDate.setDate(currentDate.getDate() + 2);
    } else if (currentDate.getDay() === 6) {
      // Saturday
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  // Return the next working day
  return formatDayDate(currentDate);
}

export function calculatePrice(
  basePrice: number,
  selectedOptions: Record<string, string>,
  variations: Variation[],
): number {
  let finalPrice = basePrice;

  for (const [type, selectedOption] of Object.entries(selectedOptions)) {
    const variation = variations.find((v) => v.type === type);
    if (variation) {
      const option = variation.options.find((o) => o.name === selectedOption);
      if (option) {
        finalPrice += option.priceAdjustment;

        // Handle sub-variations if any
        if (option.subVariations) {
          for (const subVariation of option.subVariations) {
            const subSelectedOption = selectedOptions[subVariation.type];
            if (subSelectedOption) {
              const subOption = subVariation.options.find(
                (o) => o.name === subSelectedOption,
              );
              if (subOption) {
                finalPrice += subOption.priceAdjustment;
              }
            }
          }
        }
      }
    }
  }

  return finalPrice;
}

export const getSubVariations = (
  variations: Variation[],
  selectedOptions: Record<string, string>,
): Variation[] => {
  const subVariations: Variation[] = [];
  for (const type in selectedOptions) {
    const variation = variations.find((v) => v.type === type);
    if (variation) {
      const selectedOption = variation.options.find(
        (option) => option.name === selectedOptions[type],
      );
      if (selectedOption && selectedOption.subVariations) {
        subVariations.push(...selectedOption.subVariations);
      }
    }
  }
  return subVariations;
};

export const getFirstOptionsWithSubVariants = (
  variants: Variation[],
): Record<string, string> => {
  const selectedOptions: Record<string, string> = {};

  for (const variant of variants) {
    if (variant.options.length > 0) {
      selectedOptions[variant.type] = variant.options[0].name;
      if (variant.options[0].subVariations) {
        for (const subVariant of variant.options[0].subVariations) {
          if (subVariant.options.length > 0) {
            selectedOptions[subVariant.type] = subVariant.options[0].name;
          }
        }
      }
    }
  }

  return selectedOptions;
};

export const getSelectedOptionsFromURL = (
  variations: Variation[],
  searchParams: any,
): Record<string, string> => {
  const selectedOptions: Record<string, string> = {};
  for (const variation of variations) {
    const selectedOption = searchParams.get(variation.type);
    if (selectedOption) {
      selectedOptions[variation.type] = selectedOption;
    }
  }
  return selectedOptions;
};

const sortObjectKeys = (obj: Record<string, any>): Record<string, any> => {
  const sortedObj: Record<string, any> = {};
  const sortedKeys = Object.keys(obj).sort();

  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }

  return sortedObj;
};

const deepEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
): boolean => {
  const sortedObj1 = sortObjectKeys(obj1);
  const sortedObj2 = sortObjectKeys(obj2);

  return JSON.stringify(sortedObj1) === JSON.stringify(sortedObj2);
};
