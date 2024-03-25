"use sever";
import { BagCard, CustomInput } from "@/components";
import Message from "@/components/Message";
import { formInputs } from "@/constants";
import { fetchProductsById } from "@/lib";
import { fetchPromoCode } from "@/lib/actions/promo-code.actions";
import { CartItem } from "@/types";
import { reformatCartItems } from "@/utils";
import { cookies } from "next/headers";

const CheckOutPage = async ({
  searchParams,
}: {
  searchParams: { coupon: string };
}) => {
  const coupon = searchParams.coupon || "";
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  const products = await fetchProductsById(cart.map((item) => item.productId));
  const cartProducts = reformatCartItems(cart, products);

  const promoCode = await fetchPromoCode(coupon);
  const discountPercentage = promoCode.discount / 100 || 0;

  const subTotal = cartProducts.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.amount,
    0,
  );
  const minSubTotal = cartProducts.reduce(
    (acc, item) => acc + item.minPrice * item.amount,
    0,
  );
  const shipping = subTotal > 100 ? 0 : 10;
  const discountValue = Math.ceil(discountPercentage * subTotal);
  const discount = subTotal - discountValue > minSubTotal ? discountValue : 0;
  const total = subTotal + shipping - discount;

  return cart.length === 0 ? (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">Check Out</h1>
      <Message message="Your cart is empty" />
    </div>
  ) : (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">Check Out</h1>
      <form
        action=""
        // onSubmit={handleSubmit}
        className=" flex w-full flex-col gap-10 md:flex-row "
      >
        <div className="flex w-full flex-col gap-2 ">
          <div className="flex w-full  gap-2">
            <CustomInput
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              required={true}
              minLength={2}
              maxLength={30}
              defaultValue="John"
            />
            <CustomInput
              label="Last Name"
              type="text"
              placeholder="Enter your Last name"
              name="lastName"
              required={true}
              minLength={2}
              maxLength={30}
              defaultValue="Doe"
            />
          </div>
          {formInputs.map((input, index) => (
            <CustomInput
              key={index}
              {...input}
              defaultValue={input.placeholder}
            />
          ))}
        </div>
        <div className="flex w-full flex-col gap-5 ">
          <h1 className="pb-5 text-xl font-semibold md:text-3xl">Your Order</h1>
          {cartProducts.map((item, index) => (
            <BagCard readonly {...item} key={index} />
          ))}

          <div className="flex flex-col gap-2 border-b border-gray-500 pb-2">
            <div className="flex justify-between">
              <p className=" font-bold text-gray-600 dark:text-gray-300">
                Subtotal
              </p>
              <p className="  font-medium ">{subTotal.toFixed(2)} EGP</p>
            </div>
            <div className="flex justify-between">
              <p className=" font-bold text-gray-600 dark:text-gray-300">
                Discounts
              </p>
              <p className="  font-medium text-green-600 ">
                -{discount.toFixed(2)} EGP
              </p>
            </div>
            <div className="flex justify-between">
              <p className=" font-bold text-gray-600 dark:text-gray-300">
                Shipping
              </p>
              <p className="  font-medium ">{shipping.toFixed(2)} EGP</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className=" font-bold text-gray-600 dark:text-gray-300">Total</p>
            <p className="  font-medium ">{total.toFixed(2)} EGP</p>
          </div>

          <button
            type="submit"
            className="group mt-2 h-12 w-full overflow-hidden rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
          >
            <p className="duration-500 group-hover:scale-110">
              Place Order {total.toFixed(0)} EGP
            </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutPage;
