import {
  CartItem,
  CartProduct,
  CategoryCount,
  FilterType,
  Product,
} from "@/types";

export const getCartProducts = (cart: CartItem[], products: Product[]) => {
  if (cart.length === 0 || products.length === 0) return [];
  const examples: CartProduct[] = [];
  cart.forEach((item) => {
    const product = products.find((product) => product.id === item.productId);
    if (product) {
      const example: CartProduct = {
        ...product,
        amount: item.amount,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      };
      examples.push(example);
    }
  });
  return examples;
};

export function generateCategoryCounts(products: Product[]): CategoryCount[] {
  if (!products.length) return [];
  const categoryCounts: { [key: string]: number } = {};

  // Count categories in the products array
  products.forEach((product) => {
    const productCategories = product.categories.split(", ");

    productCategories.forEach((category) => {
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });

  // Convert category counts object to array of objects
  const resultCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => {
      return { name: category, count: categoryCounts[category] };
    },
  );

  return resultCategories.filter(
    (category) =>
      category.name.toLocaleLowerCase() !== "men" &&
      category.name.toLocaleLowerCase() !== "women",
  );
}

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
