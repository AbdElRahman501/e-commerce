import { SearchField } from "@/components";
import CustomTable from "@/components/CustomTable";
import { fetchOrders } from "@/lib/actions/order.actions";
import { formatDate } from "@/utils";
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
  const resultsText = orders.length > 1 ? "results" : "result";
  return (
    <Suspense>
      <div className="flex items-center justify-center gap-3 px-5 md:gap-5 lg:px-20">
        <h1 className=" mr-auto hidden text-3xl font-bold md:block">Orders</h1>
        <SearchField />
      </div>
      <Suspense>
        <div className="flex flex-col gap-5 p-5 lg:p-20">
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
