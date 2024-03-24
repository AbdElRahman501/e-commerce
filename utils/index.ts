import {
  CartItem,
  CartProduct,
  OfferType,
  Order,
  Product,
  ProductOnSaleType,
} from "@/types";

import formatOrderItems from "./formatOrderItems";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getCartProducts = (
  cart: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!cart?.length) return setLoading(false);
  try {
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: cart.map((item) => item.productId) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) return setLoading(false);
        if (data.products)
          setCartProducts(
            cart.map((cartItem: CartItem) => {
              const product = data.products.find(
                (product: CartProduct) => product.id === cartItem.productId,
              );
              if (product) {
                return {
                  ...product,
                  amount: cartItem.amount,
                  selectedColor: cartItem.selectedColor,
                  selectedSize: cartItem.selectedSize,
                };
              }
            }),
          );
        setLoading(false);
      });
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
export const getProductsByIds = (
  ids: string[],
  setProducts: React.Dispatch<React.SetStateAction<ProductOnSaleType[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!ids?.length) return setLoading(false);
  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return setLoading(false);
      if (data.products) setProducts(data.products);
      setLoading(false);
    });
};

export const createOrder = (
  order: Order,
  cartProducts: CartProduct[],
  afterOrder: (orderId: string) => void,
) => {
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order, products: cartProducts }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data?.orderId) return;
      afterOrder(data.orderId);
    });
};

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
  if (!originalUrl) return "";
  const parts = originalUrl.split("/upload/");
  const transformation = `w_${width},h_${height},c_fill/`;
  const transformedUrl = parts[0] + "/upload/" + transformation + parts[1];
  return transformedUrl;
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const getProperties = ({
  setSizes,
  setColors,
}: {
  setSizes?: React.Dispatch<React.SetStateAction<string[]>>;
  setColors?: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  fetch(`/api/products/sizes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return;
      if (data.allSizes) setSizes && setSizes(data.allSizes);
      if (data.allColors) setColors && setColors(data.allColors);
    });
};

export const removeProduct = (productId: string): any => {
  fetch(`/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return { error: "cannot delete product" };
      if (data.status === 200) {
        return { success: true };
      }
      return { error: "cannot delete product" };
    });
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

export const fetchOffers = async (
  setOffers: React.Dispatch<React.SetStateAction<OfferType[]>>,
) => {
  fetch(`/api/offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return;
      if (data.offers) setOffers && setOffers(data.offers);
    });
};

export const fetchDiscount = async (
  code: string,
  done: (data: any) => void,
) => {
  fetch(`/api/offers/discount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  })
    .then((res) => res.json())
    .then((data) => {
      done(data);
    });
};
export { formatOrderItems };
