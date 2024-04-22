import { CartItem, OfferType, Product, ProductOnSaleType } from "@/types";
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
  let matchingSale = offers.find((sale) =>
    matchingString.includes(sale.category.toLowerCase()),
  );

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

export const modifyProducts = (products: Product[], offers: OfferType[]) => {
  const modifiedProducts = products.map((product) => {
    const { salePrice, saleValue } = getSalePrice(offers, product);
    return { ...product, salePrice, saleValue };
  });
  return modifiedProducts;
};

export const checkIsInCart = (cart: CartItem[], cartItem: CartItem) => {
  if (!cart?.length || !cartItem) return false;
  const { productId, selectedColor, selectedSize } = cartItem;
  const isInCart = cart.some(
    (item) =>
      item.productId === productId &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize,
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
        selectedColor: cartItem.selectedColor,
        selectedSize: cartItem.selectedSize,
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

export function formatPrice(price: number, currency: string) {
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
  if (subTotal - 50 > freeShippingMinValue) return true;
  return false;
}
export { formatOrderItems };
