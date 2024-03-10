import { FAQSection, Hero, ProductsRow, Testimonials } from "@/components";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsRow title="Trending" url="/shop" />
      <ProductsRow title="New Arrivals" url="/shop" />
      <ProductsRow title="Best Sellers" url="/shop" />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
