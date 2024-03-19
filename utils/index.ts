import {
  CartItem,
  CartProduct,
  CategoryCount,
  FilterType,
  Order,
  Product,
} from "@/types";

import formatOrderItems from "./formatOrderItems";
import { ReadonlyURLSearchParams } from "next/navigation";

export const getAllCategories = (
  setCategories: React.Dispatch<React.SetStateAction<CategoryCount[]>>,
) => {
  fetch(`/api/products/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return [];
      if (!data?.categoriesWithProductCount) return [];
      setCategories(data.categoriesWithProductCount);
    });
};
export const getProducts = (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  fetch(`/api/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return;
      if (!data.products) return;
      setProducts(data.products);
      setLoading(false);
    });
};
export const getOrders = (
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  fetch(`/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return;
      if (!data.orders) return;
      setOrders(data.orders);
      setLoading(false);
    });
};

export const getProduct = (
  setProduct: React.Dispatch<React.SetStateAction<Product>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  productId: string,
) => {
  fetch(`/api/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data?.product) return setLoading(false);
      setProduct(data.product);
      setLoading(false);
    });
};

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
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
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

export const getOrder = (
  orderId: string,
  setOrder: React.Dispatch<React.SetStateAction<Order>>,
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  fetch(`/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) return setLoading(false);
      if (!data.order) return setLoading(false);
      setOrder(data.order);
      getCartProducts(data.order.products, setCartProducts, setLoading);
    });
};

export function getAllImages(images: Record<string, string[]>) {
  let allImages: string[] = [];
  for (const color in images) {
    allImages = allImages.concat(images[color]);
  }
  return allImages;
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
      console.log("🚀 ~ .then ~ data:", data);
      if (!data) return { error: "cannot delete product" };
      if (data.status === 200) {
        return { success: true };
      }
      return { error: "cannot delete product" };
    });
};
export { formatOrderItems };
