import { CartComponent, ProductsRow } from "@/components";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense>
        <CartComponent />
        <Suspense>
          <ProductsRow title="You may also like" url="/shop" />
        </Suspense>
      </Suspense>
    </>
  );
};

export default page;
