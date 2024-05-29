"use server";
import { SubscriptionState } from "@/types";
import { cookies } from "next/headers";

export async function updateState(state: SubscriptionState) {
  cookies().set("subscriptionState", state);
  return state;
}
