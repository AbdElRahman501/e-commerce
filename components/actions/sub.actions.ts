"use server";
import { SubscriptionState } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function updateState(state: SubscriptionState) {
  cookies().set("subscriptionState", state);
  revalidateTag("subscribe");
  return state;
}
