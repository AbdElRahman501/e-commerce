import { SearchField } from "@/components";
import CustomTable from "@/components/CustomTable";
import { fetchOrders, updateOrder } from "@/lib/actions/order.actions";
import { Order } from "@/types";
import { formatDate, formatPrice } from "@/utils";
import Link from "next/link";
import { Suspense } from "react";

const OrderStatus = (item: Order) => {
  const st = item.status;
  const color =
    st === "Accepted" || st === "Delivered"
      ? "text-green-500"
      : st === "Shipped"
        ? "text-blue-500"
        : st === "Pending"
          ? "text-yellow-500"
          : "text-red-500";
  const pathName = "/dashboard/orders";
  const editPathName = "edit" + "order".toUpperCase() + "Id";

  return (
    <Link
      replace
      scroll={false}
      href={`${pathName}?${editPathName}=${item.id}`}
      className={" text-sm font-bold  hover:underline " + color}
    >
      {item.status}
    </Link>
  );
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as {
    [key: string]: string;
  };
  const orders = await fetchOrders({ query: searchValue });
  const resultsText = orders.length > 1 ? "results" : "result";
  return (
    <Suspense>
      <div className="flex items-center justify-center gap-3 px-2 md:gap-2 lg:px-5">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">Orders</h1>
        <SearchField />
      </div>
      <Suspense>
        <div className="mt-5 flex flex-col gap-5 px-2 lg:p-20">
          {searchValue ? (
            <p className="mb-4">
              {orders.length === 0
                ? "There are no products that match "
                : `Showing ${orders.length} ${resultsText} for `}
              <span className="font-bold">&quot;{searchValue}&quot;</span>
            </p>
          ) : null}
          <div className="flex flex-col gap-2">
            <CustomTable
              editAction={updateOrder}
              inputObj={{
                status: "LIST:Pending,Delivered,Shipped,Accepted,Canceled",
              }}
              name="order"
              data={orders.map((item) => ({
                ...item,
                ...item.personalInfo,
                date: formatDate(item.createdAt),
              }))}
              CustomActions={[
                {
                  key: "id",
                  Action: (item) => (
                    <Link
                      className="text-blue-700 hover:underline"
                      href={`/confirmation/${item.id}`}
                    >
                      #{item.id}
                    </Link>
                  ),
                },
                {
                  key: "phoneNumber",
                  Action: (item) => (
                    <Link
                      className="text-blue-700 hover:underline"
                      href={`tel:${item.phoneNumber}`}
                    >
                      {item.phoneNumber}
                    </Link>
                  ),
                },
                {
                  key: "state",
                  Action: OrderStatus,
                },
                {
                  key: "revenue",
                  Action: (order) => {
                    const subTotal = order.subTotal;
                    const minSubTotal = order.products.reduce(
                      (acc: number, item: any) =>
                        acc + (item.minPrice || 0) * item.amount,
                      0,
                    );
                    const revenue = subTotal - order.discount - minSubTotal;
                    return (
                      <p className="font-bold text-green-500">
                        {formatPrice(revenue, "EGP")}
                      </p>
                    );
                  },
                },
                {
                  key: "total",
                  Action: (order) => <p>{formatPrice(order.total, "EGP")}</p>,
                },
              ]}
              header={[
                "id",
                "firstName",
                "phoneNumber",
                "city",
                "streetAddress",
                "total",
                "revenue",
                "state",
                "date",
              ]}
            />
          </div>
        </div>
      </Suspense>
    </Suspense>
  );
}
