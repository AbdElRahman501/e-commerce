import { Suspense } from "react";
import dynamic from "next/dynamic";

export const metadata = {
  description:
    "Explore a curated collection of high-quality printed t-shirts featuring unique and creative designs for every occasion.",
  openGraph: {
    type: "website",
  },
};

const FAQSection = dynamic(() => import("@/components/FAQSection"));
const Footer = dynamic(() => import("@/components/Footer"));
const Hero = dynamic(() => import("@/components/Hero"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const ProductsRow = dynamic(() => import("@/components/ProductsRow"));
const SubscriptionSection = dynamic(
  () => import("@/components/SubscriptionSection"),
);

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { customer_posted } = searchParams as {
    [key: string]: string;
  };
  return (
    <>
      <Suspense>
        <Hero />
        <Suspense>
          <ProductsRow title="Trending" url="/shop?sort=Trending" />
        </Suspense>
        <Suspense>
          <ProductsRow title="New Arrivals" url="/shop?sort=New Arrivals" />
        </Suspense>
        <Suspense>
          <ProductsRow title="Best Sellers" url="/shop?sort=Best Sellers" />
        </Suspense>
        <Suspense>
          <Testimonials />
        </Suspense>
        <FAQSection />
        <SubscriptionSection customer_posted={customer_posted} />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
