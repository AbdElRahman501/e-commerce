import React, { Suspense } from "react";
import { Footer } from "@/components";
import { notFound } from "next/navigation";
import { fetchPromoCodeById } from "@/lib/actions/promo-code.actions";
import { fetchSubscriber } from "@/lib/actions/users.actions";

export default async function SubscriberWelcome({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [subscribedId, promoCodeId] = params.id.split("-");

  const promoCode = await fetchPromoCodeById(promoCodeId);
  const subscribed = await fetchSubscriber(subscribedId);

  if (!promoCode?._id || !subscribed?._id) {
    return notFound();
  }

  return (
    <>
      <Suspense>
        <div>{promoCode.code}</div>
      </Suspense>

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
