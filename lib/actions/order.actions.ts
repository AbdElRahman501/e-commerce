import { Order as OrderType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { Order } from "@/lib";

export async function createOrder(order: OrderType) {
  try {
    connectToDatabase();
    const orderNew = new Order(order);
    const data = await orderNew.save();
    const createdOrder: OrderType = JSON.parse(JSON.stringify(data));
    return createdOrder;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}
