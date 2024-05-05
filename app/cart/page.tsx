import { CartItem } from "@/types";
import { reformatCartItems } from "@/utils";
import { cookies } from "next/headers";
import { fetchProductsById } from "@/lib";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { BagCard, CartPricing } from "@/components";
import ProductsRow from "@/components/ProductsRow";
import { ProductSkeleton } from "@/components/LoadingSkeleton";

const Message = dynamic(() => import("@/components/Message"));

export default async function CartComponent({
  searchParams,
}: {
  searchParams: { coupon?: string };
}) {
  const coupon = searchParams.coupon || "";
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  const products = await fetchProductsById(cart.map((item) => item.productId));
  const cartProducts = reformatCartItems(cart, products);

  return (
    <>
      <div className="mx-auto max-w-8xl p-5 lg:px-20">
        <h1 className="pb-5 text-center text-3xl font-extrabold">Cart</h1>
        {cart.length === 0 ? (
          <Message message="Your cart is empty" />
        ) : (
          <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
            {
              <div className=" flex w-full flex-col gap-5 ">
                {cartProducts?.map(
                  (product) =>
                    product.id && <BagCard {...product} key={product.id} />,
                )}
              </div>
            }
            <CartPricing cart={cartProducts} coupon={coupon} />
          </div>
        )}
      </div>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsRow
          title="You may also like"
          url="/shop"
          filter={{
            keywordFilter: cartProducts
              .map((product) => product.keywords)
              .join(" , "),
            idsToExclude: cartProducts.map((product) => product.id),
          }}
        />
      </Suspense>
    </>
  );
}
