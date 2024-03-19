import React, { Suspense } from "react";
import { Footer, ProductDetailsComponent, ProductsRow } from "@/components";
import { ProductDetailPageProps } from "@/types";
import { getAsyncProduct } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllImages } from "@/utils";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getAsyncProduct(params.id);

  if (!product) return notFound();
  const images = getAllImages(product.images);
  const url = images[0] || "";

  return {
    title: product.title,
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
              width: 1200,
              height: 630,
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

  const product = await getAsyncProduct(id);

  if (!product?.id) {
    return notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images[0],
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EGP",
      highPrice: product.price,
      lowPrice: product.price * 0.9,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <Suspense>
        <ProductDetailsComponent product={product} />
      </Suspense>

      <Suspense>
        <ProductsRow title="You may also like" url="/shop" />
      </Suspense>

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
