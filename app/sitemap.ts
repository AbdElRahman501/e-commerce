import { fetchProducts } from "@/lib/actions/product.actions";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string | Date;
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap: Route[] = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
    },
  ];

  try {
    const products = await fetchProducts();
    const productsRoutes: Route[] = products
      .filter((product) => product.active)
      .map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: product.updatedAt,
      }));

    return [...routesMap, ...productsRoutes];
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }
}
