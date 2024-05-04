import { Suspense } from "react";
import dynamic from "next/dynamic";
import { fetchFilteredProducts } from "@/lib";
import { FAQSection, Footer, Hero, Testimonials } from "@/components";
import ProductsRow from "@/components/ProductsRow";
import SubscriptionSection from "@/components/SubscriptionSection";

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

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { customer_posted } = searchParams as {
    [key: string]: string;
  };
  let myCount = 0;
  const { products: trendingProducts, count } = await fetchFilteredProducts({
    sort: "Trending",
    limit: 4,
  });
  myCount = count - 4;
  const { products: newArrivalsProducts } = await fetchFilteredProducts({
    sort: "New Arrivals",
    limit: 4,
    minLimit: myCount === 0 ? 0 : 4,
    idsToExclude: trendingProducts.map((product) => product.id),
  });
  myCount = myCount >= 4 ? myCount - 4 : 0;
  const { products: bestSellersProducts } = await fetchFilteredProducts({
    sort: "Best Sellers",
    limit: 4,
    minLimit: myCount === 0 ? 0 : 4,
    idsToExclude: [
      ...newArrivalsProducts.map((product) => product.id),
      ...trendingProducts.map((product) => product.id),
    ],
  });
  return (
    <>
      <Suspense>
        <Hero />
        <Suspense>
          <ProductsRow
            initialProducts={trendingProducts.slice(0, 4)}
            title="Trending"
            url="/shop?sort=Trending"
          />
        </Suspense>
        <Suspense>
          <ProductsRow
            initialProducts={newArrivalsProducts.slice(0, 4)}
            title="New Arrivals"
            url="/shop?sort=New Arrivals"
          />
        </Suspense>
        <Suspense>
          <ProductsRow
            initialProducts={bestSellersProducts.slice(0, 4)}
            title="Best Sellers"
            url="/shop?sort=Best Sellers"
          />
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
