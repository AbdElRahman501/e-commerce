import {
  FAQSection,
  Footer,
  Hero,
  ProductsRow,
  Testimonials,
} from "@/components";
import { Suspense } from "react";

export const runtime = "edge";

export const metadata = {
  description:
    "Explore a curated collection of high-quality printed t-shirts featuring unique and creative designs for every occasion.",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense>
        <ProductsRow title="Trending" url="/shop?section=Trending" />
        <ProductsRow title="New Arrivals" url="/shop?section=New Arrivals" />
        <ProductsRow title="Best Sellers" url="/shop?section=Best Sellers" />
        <Testimonials />
        <FAQSection />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
