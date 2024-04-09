import { CartItem } from "@/types";
import { reformatCartItems } from "@/utils";
import { cookies } from "next/headers";
import { fetchProductsById } from "@/lib";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const BagCard = dynamic(() => import("@/components/BagCard"));
const CartPricing = dynamic(() => import("@/components/CartPricing"));
const Message = dynamic(() => import("@/components/Message"));
const ProductsRow = dynamic(() => import("@/components/ProductsRow"));

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
      <div className="p-5 lg:px-20">
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
      <Suspense>
        <ProductsRow
          title="You may also like"
          url="/shop"
          keyWords={cartProducts.map((product) => product.keywords).join(" , ")}
        />
      </Suspense>
    </>
  );
}
