import { FAQSection, Footer, Hero, Testimonials } from "@/components";
import ProductsRow from "@/components/ProductsRow";
import { Suspense } from "react";

export const metadata = {
  description:
    "Explore a curated collection of high-quality printed t-shirts featuring unique and creative designs for every occasion.",
  openGraph: {
    type: "website",
  },
};

export default async function Home() {
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
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
