import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FAQSection, Footer, Hero, Testimonials } from "@/components";
import SubscriptionSection from "@/components/SubscriptionSection";
import ProductsRows from "@/components/ProductsRows";
import { ProductSkeleton } from "@/components/LoadingSkeleton";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata = {
  description:
    "Stand out from the crowd in custom t-shirts made just for you from EH!. Add personalized designs that reflect your individuality and interests. Nationwide delivery in Egypt for your unique tees.",
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
      <WhatsAppButton />
    </>
  );
}
