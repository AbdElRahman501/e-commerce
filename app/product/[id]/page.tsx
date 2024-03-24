import React, { Suspense } from "react";
import { Footer, ProductDetailsComponent } from "@/components";
import { ProductDetailPageProps } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllImages, getTransformedImageUrl } from "@/utils";
import ProductsRow from "@/components/ProductsRow";
import { fetchProduct } from "@/lib";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await fetchProduct(params.id);

  if (!product) return notFound();
  const images = getAllImages(product.images);
  const url = getTransformedImageUrl(images[0] || "", 200, 300);

  return {
    title:
      product.title + " (" + (product.salePrice || product.price) + " EGP)",
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

  const product = await fetchProduct(id);

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
        <ProductDetailsComponent {...product} />
      </Suspense>

      <Suspense>
        <ProductsRow
          title="You may also like"
          keyWords={product.keywords}
          url="/shop"
        />
      </Suspense>

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
