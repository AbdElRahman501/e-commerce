import { FAQSection, Hero, ProductsRow, Testimonials } from "@/components";
import { fetchProducts } from "@/lib";

export default async function Home() {
  const products = await fetchProducts();

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
