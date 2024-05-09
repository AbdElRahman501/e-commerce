import { SectionTitle } from "@/components";
import CustomTable from "@/components/CustomTable";
import OrdersTable from "@/components/OrdersTable";
import ProductTable from "@/components/ProductTable";
import TotalCard from "@/components/TotalCard";
import { dashboardCards } from "@/constants";
import { fetchFilteredProducts } from "@/lib";
import { fetchOrders } from "@/lib/actions/order.actions";
import { fetchUsers } from "@/lib/actions/users.actions";
import { findUniqueCustomers, formatPrice, getRevenue } from "@/utils";
import Link from "next/link";
import React, { Suspense } from "react";

const DashBoardPage = async () => {
  const orders = await fetchOrders();
  const { products } = await fetchFilteredProducts({
    containMainProduct: true,
  });
  const pending = orders?.filter((order) => order.status === "Pending").length;
  const deliveredRevenue = getRevenue(
    orders.filter((order) => order.status === "Delivered"),
    products,
  );
  const pendingRevenue = getRevenue(
    orders.filter(
      (order) => order.status !== "Delivered" && order.status !== "Canceled",
    ),
    products,
  );

  const totalSales = orders
    .filter((order) => order.status === "Delivered")
    .reduce((acc, order) => acc + order.subTotal - order.discount, 0);
  const pendingSales = orders
    .filter(
      (order) => order.status !== "Delivered" && order.status !== "Canceled",
    )
    .reduce((acc, order) => acc + order.subTotal - order.discount, 0);

  const customers = findUniqueCustomers(orders.map((x) => x.personalInfo));

  const subscribers = await fetchUsers();

  return (
    <div className=" flex flex-col gap-5 p-5 lg:p-20">
      <div className=" grid grid-cols-2 gap-2">
        <TotalCard
          image="/icons/order.svg"
          title={"Orders"}
          number={orders.length}
          description={pending > 0 ? "+" + pending : ""}
          url="/orders"
        />
        <TotalCard
          image="/icons/revenue.svg"
          title={"Revenue"}
          number={formatPrice(deliveredRevenue, "EGP")}
          description={
            pendingRevenue > 0 ? "+" + formatPrice(pendingRevenue, "EGP") : ""
          }
          url="/orders"
        />
        <TotalCard
          image="/icons/sales.svg"
          title={"Sales"}
          number={formatPrice(totalSales, "EGP")}
          description={
            pendingSales > 0 ? "+" + formatPrice(pendingSales, "EGP") : ""
          }
        />
        <TotalCard
          image="/icons/customers.svg"
          title={"Customers"}
          number={customers.length}
        />

        <TotalCard
          image="/icons/subscribers.svg"
          title={"Subscribers"}
          number={subscribers.length}
        />
      </div>
      <div className="flex flex-col gap-2">
        <SectionTitle title={"Products"} url={"/dashboard/products"} />
        <CustomTable
          data={products.slice(0, 5).map((item) => ({
            ...item,
            image: item.images[item.colors[0]][0],
          }))}
          header={["views", "sales", "image", "price"]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <SectionTitle title={"Orders"} url={"/dashboard/orders"} />
        <CustomTable
          data={orders.slice(0, 5).map((item) => ({
            ...item,
            id: "#" + item.id.slice(0, 5),
            ...item.personalInfo,
          }))}
          header={["id", "firstName", "state", "total"]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <SectionTitle title={"subscribers"} url={"/dashboard/subscribers"} />
        <CustomTable
          data={subscribers.slice(0, 5)}
          header={["email"]}
          CustomActions={[
            {
              key: "email",
              Action(item) {
                return (
                  <Link
                    className="text-blue-700 hover:underline"
                    href={`mailto:${item.email}`}
                  >
                    {item.email}
                  </Link>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DashBoardPage;
