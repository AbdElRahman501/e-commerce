import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FAQSection, Footer, Hero, Testimonials } from "@/components";
import SubscriptionSection from "@/components/SubscriptionSection";
import ProductsRows from "@/components/ProductsRows";
import { ProductSkeleton } from "@/components/LoadingSkeleton";

export const metadata = {
  description:
    "Explore a curated collection of high-quality printed t-shirts featuring unique and creative designs for every occasion.",
  openGraph: {
    type: "website",
  },
};

const SubscriptionModal = dynamic(
  () => import("@/components/SubscriptionModal"),
);

export default function Home({
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
        <Suspense
          fallback={
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          }
        >
          <ProductsRows />
        </Suspense>
        <Suspense>
          <Testimonials />
        </Suspense>
        <FAQSection />
        <SubscriptionSection customer_posted={customer_posted} />
        <SubscriptionModal />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
