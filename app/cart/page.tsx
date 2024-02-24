import { CartComponent, ProductsRow } from "@/components";
import { products } from "@/constants";

const page = () => {
  return (
    <section>
      <CartComponent />
      <ProductsRow title="You may also like" url="/shop" products={products} />
    </section>
  );
};

export default page;
