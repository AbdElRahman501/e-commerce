import { FAQSection, Hero, ProductsRow, Testimonials } from "@/components";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsRow title="Trending" url="/shop?section=Trending" />
      <ProductsRow title="New Arrivals" url="/shop?section=New Arrivals" />
      <ProductsRow title="Best Sellers" url="/shop?section=Best Sellers" />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
