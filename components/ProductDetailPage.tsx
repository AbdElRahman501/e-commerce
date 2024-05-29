import React, { Suspense } from "react";
import ProductDetailsComponent from "./ProductDetailsComponent";
import { ProductSkeleton } from "./LoadingSkeleton";
import ProductsRow from "./ProductsRow";
import {
  findBestMatchProducts,
  getProduct,
} from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { CartItem } from "@/types";

const ProductDetailPage = async ({ id }: { id: string }) => {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

  const favData = cookies().get("favorite")?.value;
  const fav: string[] = favData ? JSON.parse(favData) : [];
  const isFav = !!fav.find((item) => item === id);

  const product = await getProduct(id);
  const bestMatch = await findBestMatchProducts(product);

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
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsRow
          initialProducts={bestMatch}
          title="You may also like"
          url="/shop"
        />
      </Suspense>
    </>
  );
};

export default ProductDetailPage;
