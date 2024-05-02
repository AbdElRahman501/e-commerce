import { SearchField } from "@/components";
import { setOrderNumber } from "@/components/actions/order.actions";
import CustomTable from "@/components/CustomTable";
import SubmitButton from "@/components/SubmitButton";
import { fetchOrders } from "@/lib/actions/order.actions";
import { formatDate } from "@/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as {
    [key: string]: string;
  };
  const orders = await fetchOrders({ query: searchValue });
  const ordersNumberData = cookies().get("orders")?.value;
  const seenOrders: string[] = ordersNumberData
    ? JSON.parse(ordersNumberData)
    : [];

  const resultsText = orders.length > 1 ? "results" : "result";
  return (
    <Suspense>
      <div className="flex items-center justify-center gap-3 px-2 md:gap-2 lg:px-5">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">Orders</h1>
        <SearchField />
      </div>
      <Suspense>
        <form className="flex w-full justify-end p-2" action={setOrderNumber}>
          <input
            type="text"
            name="orders"
            defaultValue={orders.map((item) => item.id).join(",")}
            id=""
            hidden
          />
          <SubmitButton
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-center text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white"
          >
            read all {(orders.length - seenOrders.length).toFixed(0)}
          </SubmitButton>
        </form>
        <div className="flex flex-col gap-5 px-2 lg:p-20">
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
              data={orders.map((item) => ({
                ...item,
                ...item.personalInfo,
                date: formatDate(item.createdAt),
              }))}
              CustomActions={[
                {
                  key: "id",
                  Action: (item) => (
                    <Link href={`/confirmation/${item.id}`}>{item.id}</Link>
                  ),
                },
              ]}
              header={[
                "id",
                "firstName",
                "phoneNumber",
                "state",
                "city",
                "streetAddress",
                "total",
                "date",
              ]}
            />
          </div>
        </div>
      </Suspense>
    </Suspense>
  );
}
