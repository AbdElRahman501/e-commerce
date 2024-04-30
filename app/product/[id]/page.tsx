import React, { Suspense } from "react";
import { CartItem, ProductDetailPageProps } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllImages, getTransformedImageUrl } from "@/utils";
import { fetchProduct } from "@/lib";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";

const ProductDetailsComponent = dynamic(
  () => import("@/components/ProductDetailsComponent"),
);
const Footer = dynamic(() => import("@/components/Footer"));
const ProductsRow = dynamic(() => import("@/components/ProductsRow"));

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  const { color } = searchParams as {
    [key: string]: string;
  };

  if (!product) return notFound();
  const images = color ? product.images[color] : getAllImages(product.images);
  const url = getTransformedImageUrl(images[0] || "", 200, 300);
  const colorString = color && !color.includes("HASH:") ? ` (${color})` : "";
  return {
    title:
      product.title +
      colorString +
      " (" +
      (product.salePrice || product.price) +
      " EGP)",
    description: product.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              type: "image/png",
              width: 200,
              height: 300,
              alt: product.title,
            },
          ],
        }
      : null,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const id = params.id;

  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

  const favData = cookies().get("favorite")?.value;
  const fav: string[] = favData ? JSON.parse(favData) : [];
  const isFav = !!fav.find((item) => item === id);

  const product = await fetchProduct(id, true);

  if (!product?.id) {
    return notFound();
  }
  const url = process.env.NEXT_PUBLIC_VERCEL_URL;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: {
      "@type": "ImageObject",
      url: product.images[0],
      image: product.images[0],
      name: product.title,
      width: "1024",
      height: "1024",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EGP",
      highPrice: product.price,
      lowPrice: product.price * 0.9,
    },
    category: product.categories.trim().split(",")[0],
    brand: "eh!",
    sku: product.id,
    url: `${url}/product/${product.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <ProductDetailsComponent {...product} isFav={isFav} cart={cart} />
      <ProductsRow
        title="You may also like"
        url="/shop"
        filter={{
          keywordFilter: product.keywords,
          idsToExclude: [product.id],
        }}
      />
      <Footer />
    </>
  );
}
