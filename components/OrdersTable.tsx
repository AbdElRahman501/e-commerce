"use client";
import React from "react";
import { CustomTable, LoadingLogo } from ".";
import { Order } from "@/types";

const OrdersTable = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

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
