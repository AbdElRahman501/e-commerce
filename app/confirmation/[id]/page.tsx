import { fetchProductsById } from "@/lib";
import { fetchOrder } from "@/lib/actions/order.actions";
import { CartProduct } from "@/types";
import {
  getNextWorkingDay,
  orderStatusColor,
  reformatCartItems,
} from "@/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderId from "@/components/confirmation/OrderId";
import { BagCard } from "@/components";

const OrderConfirmationPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const orderId = params.id;
  const order = await fetchOrder(orderId);
  if (!order) return notFound();

  const products = await fetchProductsById(
    order.products.map((item) => item.productId),
  );
  const cartProducts = reformatCartItems(order.products, products);

  return (
    <div className="flex w-full flex-col items-center gap-5 p-5 lg:px-20">
      <h1 className="max-w-md pb-5 text-center text-xl font-medium text-primary_color dark:text-white md:text-3xl">
        Thank You{" "}
        <span className="font-bold"> {order.personalInfo?.firstName}</span>,{" "}
        <br /> Your order has been received
      </h1>
      <OrderId id={order.id} />
      <div className="flex w-full flex-col-reverse items-center justify-evenly rounded-md bg-gray-200 p-5 dark:bg-gray-700 sm:flex-row  lg:p-10">
        {order.personalInfo && (
          <div className=" flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-lg sm:text-2xl">
              {order.personalInfo.firstName + " " + order.personalInfo.lastName}
            </h2>
            <h3 className="text-base text-blue-800 dark:text-gray-200 sm:text-lg">
              {order.personalInfo.email || order.personalInfo.phoneNumber}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              {order.personalInfo.comment}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              {order.personalInfo.state +
                " - " +
                order.personalInfo.city +
                " - " +
                order.personalInfo.streetAddress}
            </p>
            <p>
              Status:{" "}
              <strong className={`${orderStatusColor(order.status)}`}>
                {order.status}
              </strong>
            </p>
            {order.status !== "Delivered" && order.status !== "Canceled" && (
              <p>
                expected delivery:{" "}
                <strong>{getNextWorkingDay(order.createdAt, 5)}</strong>
              </p>
            )}
          </div>
        )}
        <div className=" text-center text-primary_color dark:text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {order.total.toLocaleString("en-US", {
              style: "currency",
              currency: "EGP",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
          <h3 className="text-base sm:text-lg">
            {order.personalInfo.paymentMethod}
          </h3>
        </div>
      </div>
      <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border border-gray-500 p-5 md:max-w-lg ">
        <div className=" flex w-full flex-col gap-5 md:max-w-lg ">
          {cartProducts.length > 0
            ? cartProducts.map((item: CartProduct, index: number) => (
                <BagCard readonly removable {...item} key={index} />
              ))
            : "Your cart is empty"}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 md:text-base">
            <p>Subtotal</p>
            <p>
              {order.subTotal.toLocaleString("en-US", {
                style: "currency",
                currency: "EGP",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 md:text-base">
              <p>Discounts</p>
              <p>
                {order.discount.toLocaleString("en-US", {
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
              {order.shipping === 0
                ? "Free Shipping 🎉🎉"
                : order.shipping.toLocaleString("en-US", {
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
            {order.total.toLocaleString("en-US", {
              style: "currency",
              currency: "EGP",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <Link
        href="/shop"
        className="group mt-2 flex h-12 w-full max-w-72 items-center justify-center rounded-2xl border-2 border-primary_color uppercase hover:bg-primary_color dark:border-gray-300"
      >
        <p className="text-center text-primary_color duration-500 group-hover:scale-110 group-hover:text-white dark:text-gray-300">
          Return to Shop
        </p>
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
