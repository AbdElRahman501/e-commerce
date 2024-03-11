import {
  CartItem,
  CartProduct,
  CategoryCount,
  FilterType,
  Order,
  Product,
} from "@/types";

export function filterProducts(
  products: Product[],
  filters: FilterType,
  query: string,
): Product[] {
  if (!products.length) return [];
  return products.filter((product) => {
    // Category filter
    if (
      filters.selectedCategories.length > 0 &&
      !filters.selectedCategories.some((category) =>
        product.categories.includes(category),
      )
    ) {
      return false;
    }

    // Origin filter
    if (
      filters.originFilter.length > 0 &&
      !filters.originFilter.some((origin) => product.keywords.includes(origin))
    ) {
      return false;
    }

    // Color filter
    if (
      filters.colorFilter.length > 0 &&
      !filters.colorFilter.some((color) => product.colors.includes(color))
    ) {
      return false;
    }

    // Keyword filter
    if (
      filters.keywordFilter.length > 0 &&
      !product.keywords
        .toLowerCase()
        .includes(filters.keywordFilter.toLowerCase())
    ) {
      return false;
    }

    // Size filter
    if (
      filters.sizeFilter.length > 0 &&
      !filters.sizeFilter.some((size) => product.sizes.includes(size))
    ) {
      return false;
    }

    // Price filter
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    // Gender filter
    if (
      filters.genderFilter !== "all" &&
      product.gender !== filters.genderFilter
    ) {
      return false;
    }

    // Search query filter
    const regexQuery = new RegExp(`\\b${query}`, "i");
    if (
      query.length > 0 &&
      !(
        regexQuery.test(product.name.toLowerCase()) ||
        regexQuery.test(product.title.toLowerCase()) ||
        regexQuery.test(product.keywords.toLowerCase()) ||
        regexQuery.test(product.categories.toLowerCase())
      )
    ) {
      return false;
    }

    // If all filters passed, include the product
    return true;
  });
}

export function sortProducts(
  products: Product[],
  sortOption: string,
): Product[] {
  if (sortOption === "Price: Low to High") {
    return products.slice().sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price: High to Low") {
    return products.slice().sort((a, b) => b.price - a.price);
  }

  // Default to returning the original array if no valid sort option is provided
  return products;
}

export function filterAndSortProducts(
  products: Product[],
  filters: FilterType,
  sortOption: string,
  query: string,
): Product[] {
  const filteredProducts = filterProducts(products, filters, query);
  return sortProducts(filteredProducts, sortOption);
}

import formatOrderItems from "./formatOrderItems";

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
      if (!data) return;
      if (data.categoriesWithProductCount)
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
export const getFilteredProducts = ({
  sorting = "",
  filter = {} as FilterType,
  query = "",
  setProducts,
  setLoading,
  limit,
  setCount,
}: {
  sorting?: string;
  filter?: FilterType;
  query?: string;
  limit?: number;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  setLoading(true);
  const ascendingPrice =
    sorting === "Price: Low to High"
      ? 1
      : sorting === "Price: High to Low"
        ? -1
        : 0;

  const colors = filter.colorFilter
    ? filter.colorFilter.map((item) => item.replace("#", "HASH:"))
    : [];

  fetch(
    `/api/products/filter?query=${query}&priceSorting=${ascendingPrice}&selectedCategories=${filter.selectedCategories}&genderFilter=${filter.genderFilter}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&keywordFilter=${filter.keywordFilter}&sizeFilter=${filter.sizeFilter}&colorFilter=${colors}&originFilter=${filter.originFilter}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data) return setLoading(false);
      if (data) setProducts(data.products);
      setCount && setCount(data.count);
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

export { formatOrderItems };
