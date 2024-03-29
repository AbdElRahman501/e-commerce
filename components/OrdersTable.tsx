import React from "react";
import CustomTable from "./CustomTable";
import SectionTitle from "./SectionTitle";
import { fetchOrders } from "@/lib/actions/order.actions";

const OrdersTable = async () => {
  const orders = await fetchOrders({ limit: 5 });

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle title={"Orders"} url={"/dashboard/orders"} />
      <CustomTable
        data={orders.map((item) => ({
          ...item,
          id: "#" + item.id.slice(0, 5),
          ...item.personalInfo,
        }))}
        header={["id", "firstName", "state", "total"]}
      />
    </div>
  );
};

export default OrdersTable;
