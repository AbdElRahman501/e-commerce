import { CartComponent, ProductsRow } from "@/components";

const page = () => {
  return (
    <section>
      <CartComponent />
      <ProductsRow title="You may also like" url="/shop" />
    </section>
  );
};

export default page;
