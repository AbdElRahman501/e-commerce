import { CartComponent, ProductsRow } from "@/components";
import { fetchProducts } from "@/lib";

const page = async () => {
  const products = await fetchProducts();
  return (
    <section>
      <CartComponent />
      <ProductsRow title="You may also like" url="/shop" products={products} />
    </section>
  );
};

export default page;
