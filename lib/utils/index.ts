// import { FilterProps, FilterType, Product } from "@/types";
// export const getAsyncFilteredProducts = async ({
//   sorting = "",
//   filter = {} as FilterType,
//   query = "",
//   limit,
//   section = "",
// }: {
//   section?: string;
//   sorting?: string;
//   filter?: FilterType;
//   query?: string;
//   limit?: number;
// }): Promise<Product[]> => {
//   const ascendingPrice =
//     sorting === "Price: Low to High"
//       ? 1
//       : sorting === "Price: High to Low"
//         ? -1
//         : 0;

//   const colors = filter.colorFilter
//     ? filter.colorFilter.map((item) => item.replace("#", "HASH:"))
//     : [];

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/filter?query=${query}&priceSorting=${ascendingPrice}&selectedCategories=${filter.selectedCategories}&genderFilter=${filter.genderFilter}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&keywordFilter=${filter.keywordFilter}&sizeFilter=${filter.sizeFilter}&colorFilter=${colors}&originFilter=${filter.originFilter}&limit=${limit}&section=${section}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     const data = await res.json();
//     if (!data?.products) return [];
//     return data.products;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// export const getAsyncProduct = async (id: string): Promise<Product> => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/${id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     const data = await res.json();
//     if (!data?.product) return {} as Product;
//     return data.product;
//   } catch (error) {
//     console.log(error);
//     return {} as Product;
//   }
// };
// export const getAsyncProducts = async (
//   filter: FilterProps,
// ): Promise<{ products: Product[]; count: number }> => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products/filter`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(filter),
//         cache: "force-cache",
//       },
//     );
//     const data = await res.json();
//     if (!data?.products) return {} as { products: Product[]; count: number };
//     return {
//       products: data.products,
//       count: data.count,
//     };
//   } catch (error) {
//     console.log(error);
//     return {} as { products: Product[]; count: number };
//   }
// };
