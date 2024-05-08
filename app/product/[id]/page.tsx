import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllImages, getTransformedImageUrl } from "@/utils";
import dynamic from "next/dynamic";
import { Footer } from "@/components";
import {
  ProductDetailSkeleton,
  ProductSkeleton,
} from "@/components/LoadingSkeleton";
import { getProduct } from "@/lib/actions/product.actions";
import ProductDetailPage from "@/components/ProductDetailPage";

const SubscriptionModal = dynamic(
  () => import("@/components/SubscriptionModal"),
);

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const product = await getProduct(params.id);
  const { color } = searchParams as {
    [key: string]: string;
  };

  if (!product) return notFound();
  const images =
    color && product.images[color]
      ? product.images[color]
      : getAllImages(product.images);
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

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <>
      <Suspense
        fallback={
          <>
            <ProductDetailSkeleton />
            <ProductSkeleton />
          </>
        }
      >
        <ProductDetailPage id={id} />
      </Suspense>
      <Suspense>
        <SubscriptionModal />
        <Footer />
      </Suspense>
    </>
  );
}
