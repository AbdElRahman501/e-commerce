import { formInputs } from "@/constants";
import { createOrder, fetchProductsById } from "@/lib";
import { fetchPromoCode } from "@/lib/actions/promo-code.actions";
import { fetchShipping } from "@/lib/actions/shipping.actions";
import { CartItem } from "@/types";
import { isFreeShipping, reformatCartItems } from "@/utils";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { fetchOffers } from "@/lib/actions/offer.actions";
import Coupon from "@/components/cart/Coupon";

const BagCard = dynamic(() => import("@/components/BagCard"));
const ShippingAddress = dynamic(
  () => import("@/components/checkOut/ShippingAddress"),
);
const SubmitButton = dynamic(
  () => import("@/components/checkOut/SubmitButton"),
);
const Message = dynamic(() => import("@/components/Message"));
const CustomInput = dynamic(() => import("@/components/CustomInput"));

const CheckOutPage = async ({
  searchParams,
}: {
  searchParams: { coupon: string; state: string; city: string };
}) => {
  const coupon = searchParams.coupon || "";
  const statId = searchParams.state || "";
  const cityId = searchParams.city || "";

  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
  const products = await fetchProductsById(cart.map((item) => item.productId));
  const cartProducts = reformatCartItems(cart, products);
  const promoCode = await fetchPromoCode(coupon);
  const { governorate, cities } = await fetchShipping();

  const offers = await fetchOffers();
  const freeShippingMin = offers.find(
    (x) => x.title === "FREE_SHIPPING",
  )?.description;

  const freeShippingMinValue = Number(freeShippingMin) || null;
  const discountPercentage = promoCode.discount / 100 || 0;
  const subTotal = cartProducts.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.amount,
    0,
  );
  const minSubTotal = cartProducts.reduce(
    (acc, item) => acc + item.minPrice * item.amount,
    0,
  );
  const stateShipping = governorate.find(
    (item) => item.id === statId,
  )?.shipping_price;
  const cityShipping = cities.find(
    (item) => item.id === cityId,
  )?.shipping_price;

  const discountValue = Math.ceil(discountPercentage * subTotal);
  const discount = subTotal - discountValue > minSubTotal ? discountValue : 0;
  const restShipping =
    freeShippingMinValue && subTotal + 50 < freeShippingMinValue
      ? freeShippingMinValue - subTotal
      : 0;

  const shipping =
    restShipping === 0 && freeShippingMinValue
      ? restShipping
      : cityShipping || stateShipping || 0;
  const total = subTotal + shipping - discount;

  return cart.length === 0 ? (
    <div className="p-5 lg:px-20">
      <h2 className="pb-5 text-xl font-semibold md:text-3xl">Check Out</h2>
      <Message message="Your cart is empty" />
    </div>
  ) : (
    <div className="p-5 lg:px-20">
      <form
        action={createOrder}
        className=" flex w-full flex-col gap-10 md:flex-row "
      >
        <div className="gap- flex w-full flex-col gap-3">
          <h2 className="text-xl font-semibold md:text-2xl">Contact</h2>
          <CustomInput
            label="Email Address"
            type="email"
            placeholder="Email address (optional)"
            name="email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
          />
          <CustomInput
            label="Phone Number"
            type="text"
            placeholder="Phone number"
            name="phoneNumber"
            required={true}
            pattern="(010|011|012|015)[0-9]{8}"
          />
          <CustomInput
            label="Accept to receive offers and news"
            type="checkbox"
            required={false}
            placeholder="Accept to receive offers and news"
            name="messageAccept"
          />
          <h2 className="text-xl font-semibold md:text-2xl">
            Shipping address
          </h2>
          <div className="flex w-full gap-2">
            <CustomInput
              label="First Name"
              type="text"
              placeholder="First name"
              name="firstName"
              required={true}
              minLength={2}
              maxLength={30}
            />
            <CustomInput
              label="Last Name"
              type="text"
              placeholder="Last name"
              name="lastName"
              required={true}
              minLength={2}
              maxLength={30}
            />
          </div>
          <ShippingAddress governorate={governorate} cities={cities} />
          {formInputs.map((input, index) => (
            <CustomInput key={index} {...input} />
          ))}
          <Coupon coupon={coupon} />
          <div className="hidden">
            <CustomInput type="number" value={total} name="total" readOnly />
            <CustomInput
              type="number"
              value={subTotal}
              name="subTotal"
              readOnly
            />
            <CustomInput
              type="number"
              value={shipping}
              name="shipping"
              readOnly
            />
            <CustomInput
              type="number"
              value={discount}
              name="discount"
              readOnly
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 ">
          <h2 className=" text-xl font-semibold md:text-2xl">Your Order</h2>
          {cartProducts.map((item, index) => (
            <BagCard readonly {...item} key={index} />
          ))}

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 md:text-base">
              <p>Subtotal</p>
              <p>
                {subTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "EGP",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 md:text-base">
                <p>Discounts</p>
                <p>
                  {discount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EGP",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 md:text-base">
              <p>Shipping</p>
              <p>
                {isFreeShipping(offers, subTotal)
                  ? "free shipping 🎉🎉"
                  : shipping.toLocaleString("en-US", {
                      style: "currency",
                      currency: "EGP",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold md:text-xl">
            <p>Total</p>
            <p>
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "EGP",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <SubmitButton
            disable={!statId || !cityId}
            title={`Place Order ${total.toFixed(0)} EGP`}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckOutPage;
