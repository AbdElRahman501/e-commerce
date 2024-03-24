import { fetchProducts } from "@/lib";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string | Date;
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap: Route[] = [
    {
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
      lastModified: new Date(),
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/shop`,
      lastModified: new Date(),
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog`,
      lastModified: new Date(),
    },
  ];

  try {
    const products = await fetchProducts();
    const productsRoutes: Route[] = products.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.updatedAt,
    }));

    return [...routesMap, ...productsRoutes];
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }
}
