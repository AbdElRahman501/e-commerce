"use client";
import React from "react";
import { CustomTable, LoadingLogo } from ".";
import { Order } from "@/types";
import { getOrders } from "@/utils";

const OrdersTable = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getOrders(setOrders, setLoading);
  }, []);

  return loading ? (
    <LoadingLogo />
  ) : (
    <CustomTable
      data={orders.map((item) => ({
        ...item,
        id: "#" + item.id.slice(0, 5),
        ...item.personalInfo,
      }))}
      header={["id", "firstName", "state", "total"]}
    />
  );
};

export default OrdersTable;
