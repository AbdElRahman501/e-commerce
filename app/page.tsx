import { FAQSection, Hero, ProductsRow, Testimonials } from "@/components";
import { products } from "@/constants";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsRow title="Trending" url="/shop" products={products} />
      <ProductsRow title="New Arrivals" url="/shop" products={products} />
      <ProductsRow title="Best Sellers" url="/shop" products={products} />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
