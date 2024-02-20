import { ProductCard, SectionTitle } from ".";

const ProductsRow = () => {
  return (
    <section className="p-5 lg:px-20">
      <div className="rounded-4xl flex flex-col gap-4">
        <SectionTitle title="Products" url="/shop" />
        <div className="products scroll-bar-hidden flex gap-4 overflow-x-scroll">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
};

export default ProductsRow;
