import {
  CartItem,
  OfferType,
  Order,
  PersonalInfo,
  Product,
  ProductOnSaleType,
  Variation,
  VariationOption,
} from "@/types";
import formatOrderItems from "./formatOrderItems";
import { ReadonlyURLSearchParams } from "next/navigation";

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
      const price = calculatePrice(
        product.price,
        cartItem.selectedOptions,
        product.variations,
      );
      const minPrice = calculateMinPrice(
        product.minPrice,
        cartItem.selectedOptions,
        product.variations,
      );
      const salePrice = getSale(minPrice, price, product.saleValue);
      cartProducts.push({
        ...product,
        price,
        minPrice,
        salePrice,
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

export function generateCombinations(
  variations: Variation[],
  basePrice: number,
): Record<string, string | number>[] {
  const result: Record<string, string | number>[] = [];
  const seenCombinations = new Set<string>();

  function recurse(
    current: Record<string, string | number>,
    remainingVariations: Variation[],
  ): void {
    if (remainingVariations.length === 0) {
      const combinationString = JSON.stringify(current);
      if (!seenCombinations.has(combinationString)) {
        seenCombinations.add(combinationString);
        result.push(current);
      }
      return;
    }

    const [firstVariation, ...restVariations] = remainingVariations;
    firstVariation.options.forEach((option) => {
      const newCombination = {
        ...current,
        [firstVariation.type]: option.name,
      };
      newCombination.price = calculatePrice(
        basePrice,
        newCombination,
        variations,
      );
      if (option.subVariations?.length > 0) {
        recurse(newCombination, option.subVariations.concat(restVariations));
      } else {
        recurse(newCombination, restVariations);
      }
    });
  }

  recurse({}, variations);
  return result;
}

export function allValuesEqual<T>(arr: T[]): boolean {
  if (arr.length === 0) {
    return true; // Assuming an empty array means all values are "equal"
  }
  const firstValue = arr[0];
  for (const value of arr) {
    if (value !== firstValue) {
      return false;
    }
  }
  return true;
}

export function calculatePrice(
  basePrice: number,
  selectedOptions: Record<string, string | number>,
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
export function calculateMinPrice(
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
        finalPrice += option.minPriceAdjustment;

        // Handle sub-variations if any
        if (option.subVariations) {
          for (const subVariation of option.subVariations) {
            const subSelectedOption = selectedOptions[subVariation.type];
            if (subSelectedOption) {
              const subOption = subVariation.options.find(
                (o) => o.name === subSelectedOption,
              );
              if (subOption) {
                finalPrice += subOption.minPriceAdjustment;
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
        selectedOption.subVariations.forEach((subVariation) => {
          // Assign parent type and name to each option in the subVariation
          subVariation.options = subVariation.options.map((option) => ({
            ...option,
            parentType: type,
            parentName: selectedOption.name,
          }));
          subVariations.push(subVariation);
        });
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

export function removeDuplicateOptions(
  options: VariationOption[],
): VariationOption[] {
  const uniqueOptionsMap: Map<string, VariationOption> = new Map();

  // Store unique options in a Map using the option name as the key
  for (const option of options) {
    uniqueOptionsMap.set(option.name, option);
  }

  // Convert Map values back to an array
  const uniqueOptions: VariationOption[] = Array.from(
    uniqueOptionsMap.values(),
  );

  return uniqueOptions;
}

export function findVariationOptions(
  variations: Variation[],
  query: string,
): VariationOption[] {
  let matchingOptions: VariationOption[] = [];

  for (const variation of variations) {
    if (variation.type === query) {
      matchingOptions = matchingOptions.concat(variation.options);
    }
    for (const option of variation.options) {
      if (option.subVariations) {
        for (const subVariation of option.subVariations) {
          if (subVariation.type === query) {
            matchingOptions = matchingOptions.concat(subVariation.options);
          }
        }
      }
    }
  }

  return matchingOptions;
}

export function validateSelectedOptions(
  selectedOptions: Record<string, string>,
  variationData: Variation[],
) {
  const validatedOptions = { ...selectedOptions };

  // Iterate through variation data
  for (const variation of variationData) {
    const { type, options } = variation;
    const selectedOption = selectedOptions[type];

    // If option is not selected, skip validation
    if (!selectedOption) continue;

    const selectedOptionData = options.find(
      (option) => option.name === selectedOption,
    );

    // If selected option not found or validated to empty string, remove from validated options
    if (!selectedOptionData) {
      validatedOptions[type] = options[0].name;
      continue;
    }

    // Check if sub-variations exist
    if (
      selectedOptionData.subVariations &&
      selectedOptionData.subVariations.length > 0
    ) {
      // Iterate through sub-variations
      for (const subVariation of selectedOptionData.subVariations) {
        const subType = subVariation.type;
        const subSelectedOption = selectedOptions[subType];

        // If sub-option is not selected, skip validation
        if (!subSelectedOption) continue;

        const subSelectedOptionData = subVariation.options.find(
          (option) => option.name === subSelectedOption,
        );

        // If selected sub-option not found or validated to empty string, remove from validated options
        if (!subSelectedOptionData) {
          validatedOptions[subType] = subVariation.options[0].name;
        }
      }
    }
  }

  return validatedOptions;
}

export const addToCartCheck = (
  references: Record<string, string>,
  selectedOptions: Record<string, string>,
) => {
  const keys1 = Object.keys(references).sort();
  const keys2 = Object.keys(selectedOptions).sort();
  for (const key of keys1) {
    if (selectedOptions[key] === undefined || selectedOptions[key] === "") {
      return false;
    }
  }
  return JSON.stringify(keys1) === JSON.stringify(keys2);
};

export const getSelectedOptionsFromURL = (
  variations: Variation[],
  searchParams: URLSearchParams,
): Record<string, string> => {
  const selectedOptions: Record<string, string> = {};

  const getSelectedOptions = (
    variations: Variation[],
    searchParams: URLSearchParams,
  ) => {
    for (const variation of variations) {
      const selectedOption = searchParams.get(variation.type.trim());
      if (selectedOption) {
        selectedOptions[variation.type.trim()] = selectedOption;

        const option = variation.options.find(
          (opt) => opt.name === selectedOption,
        );
        if (option && option.subVariations) {
          getSelectedOptions(option.subVariations, searchParams);
        }
      }
    }
  };

  getSelectedOptions(variations, searchParams);
  return validateSelectedOptions(selectedOptions, variations);
};

export function getImageUrl(
  variations: Variation[],
  selectedOptions: Record<string, string>,
): string | undefined {
  let imageUrl: string | undefined = undefined;

  for (const variation of variations) {
    const selectedOption = selectedOptions[variation.type.trim()];
    if (selectedOption) {
      const option = variation.options.find(
        (opt) => opt.name === selectedOption,
      );

      if (option) {
        if (option.imageUrl) {
          imageUrl = option.imageUrl;
        }
        if (option.subVariations && option.subVariations.length > 0) {
          const subVariationUrl = getImageUrl(
            option.subVariations,
            selectedOptions,
          );
          if (subVariationUrl) {
            imageUrl = subVariationUrl;
          }
        }
      }
    }
  }

  return imageUrl;
}

const sortObjectKeys = (obj: Record<string, any>): Record<string, any> => {
  const sortedObj: Record<string, any> = {};
  const sortedKeys = Object.keys(obj).sort();

  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }

  return sortedObj;
};

export const deepEqual = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
): boolean => {
  const sortedObj1 = sortObjectKeys(obj1);
  const sortedObj2 = sortObjectKeys(obj2);

  return JSON.stringify(sortedObj1) === JSON.stringify(sortedObj2);
};

export function getSale(
  minPrice: number,
  price: number,
  sale: number | null,
): number | null {
  if (!sale) return null;
  let salePrice = Math.ceil(price - (price * sale) / 100);

  if (salePrice > minPrice) {
    return salePrice;
  }
  return null;
}

export function moveToTop(arr: string[], str: string): string[] {
  // Find the index of the string in the array
  const index = arr.indexOf(str);

  // If the string is found
  if (index !== -1) {
    // Remove the target string from the array
    arr.splice(index, 1);

    // If the string is not the last element, get the one following it
    if (index < arr.length) {
      const next = arr[index];
      // Remove the following string from the array
      arr.splice(index, 1);
      // Add the following string to the beginning of the array
      arr.unshift(next);
    }

    // Add the target string to the beginning of the array
    arr.unshift(str);
  }

  // Return the modified array
  return arr;
}

export const optionPrice = ({
  variations,
  variation,
  selectedOptions,
  basePrice,
  option,
}: {
  variations: Variation[];
  variation: Variation;
  selectedOptions: Record<string, string>;
  basePrice: number;
  option: VariationOption;
}) => {
  const priceDisplay = !allValuesEqual(
    variation.options.map((op) => op.priceAdjustment),
  );
  const modifiedSelectedOptions = {
    ...selectedOptions,
    [variation.type]: option.name,
  };
  const optionPrice = generateCombinations(variations, basePrice).find(
    (combination) => {
      const { price, ...mdCombination } = combination;
      return deepEqual(modifiedSelectedOptions, mdCombination);
    },
  )?.price;

  return priceDisplay && optionPrice ? optionPrice : null;
};
