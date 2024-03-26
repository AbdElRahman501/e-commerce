import { BagCard, CustomInput } from "@/components";
import ShippingAddress from "@/components/checkOut/ShippingAddress";
import SubmitButton from "@/components/checkOut/SubmitButton";
import Message from "@/components/Message";
import { formInputs } from "@/constants";
import { createOrder, fetchProductsById } from "@/lib";
import { fetchPromoCode } from "@/lib/actions/promo-code.actions";
import { fetchShipping } from "@/lib/actions/shipping.actions";
import { CartItem } from "@/types";
import { reformatCartItems } from "@/utils";
import { cookies } from "next/headers";

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

  const shipping = stateShipping || cityShipping || 0;
  const discountValue = Math.ceil(discountPercentage * subTotal);
  const discount = subTotal - discountValue > minSubTotal ? discountValue : 0;
  const total = subTotal + shipping - discount;

  return cart.length === 0 ? (
    <div className="p-5 lg:px-20">
      <h2 className="pb-5 text-xl font-semibold md:text-3xl">Check Out</h2>
      <Message message="Your cart is empty" />
    </div>
  ) : (
    <div className="p-5 pb-20 lg:px-20">
      <form
        action={createOrder}
        className=" flex w-full flex-col gap-10 md:flex-row "
      >
        <div className="gap- flex w-full flex-col">
          <h2 className="pb-5 text-xl font-semibold md:text-2xl">Contact</h2>
          <CustomInput
            label="Email Address"
            type="email"
            required={true}
            placeholder="Email address"
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
          <h2 className="pb-5 text-xl font-semibold md:text-2xl">
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
          <div className="hidden">
            <CustomInput type="text" value={coupon} name="promoCode" />
            <CustomInput type="number" value={total} name="total" />
            <CustomInput type="number" value={subTotal} name="subTotal" />
            <CustomInput type="number" value={shipping} name="shipping" />
            <CustomInput type="number" value={discount} name="discount" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 ">
          <h2 className="pb-5 text-xl font-semibold md:text-2xl">Your Order</h2>
          {cartProducts.map((item, index) => (
            <BagCard readonly {...item} key={index} />
          ))}

          <div className="flex flex-col gap-2 border-b border-gray-200 pb-2 dark:border-gray-700">
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

          <SubmitButton title={`Place Order ${total.toFixed(0)} EGP`} />
        </div>
      </form>
    </div>
  );
};

export default CheckOutPage;
