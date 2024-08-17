import CustomTable from "@/components/CustomTable";
import ActionButtons from "@/components/dashboard/ActionButtons";
import {
  addNewOffer,
  fetchOffers,
  removeOffer,
  updateOffer,
} from "@/lib/actions/offer.actions";
import {
  addNewPromoCode,
  fetchPromoCodes,
  removePromoCode,
  updatePromoCode,
} from "@/lib/actions/promo-code.actions";

import { Suspense } from "react";

export default async function SalesPage() {
  const offers = await fetchOffers();
  const promoCodes = await fetchPromoCodes();

  return (
    <Suspense>
      <div className="flex flex-col gap-5 p-5 lg:p-20">
        <p>
          you can add title of FREE_SHIPPING to get free shipping and add the
          max value of FREE_SHIPPING in the description
        </p>
        <div className="flex flex-col gap-2">
          <CustomTable
            name="offer"
            inputObj={{
              image: "image",
              title: "!text",
              sale: "number",
              description: "textarea",
              url: "!text",
              category: "text",
              active: "checkbox",
            }}
            addAction={addNewOffer}
            editAction={updateOffer}
            removeAction={removeOffer}
            data={offers}
            header={["image", "title", "sale", "url", "category"]}
            ActionComponent={(item) => (
              <ActionButtons name="offer" id={item._id} />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomTable
            name="promoCode"
            inputObj={{
              code: "!text",
              discount: "!number",
              limit: "!number",
              maxDiscount: "number",
              active: "checkbox",
              numItems: "number",
              forced: "checkbox",
            }}
            addAction={addNewPromoCode}
            editAction={updatePromoCode}
            removeAction={removePromoCode}
            data={promoCodes.map((item) => ({
              ...item,
              status: item.active
                ? { name: "active", color: "green" }
                : { name: "inactive", color: "red" },
            }))}
            header={[
              "code",
              "discount",
              "limit",
              "maxDiscount",
              "status",
              "numItems",
              "forced",
            ]}
            CustomActions={[
              {
                key: "forced",
                Action: (item) => (
                  <p
                    className={`${item.forced ? "text-green-500" : "text-red-500"}`}
                  >
                    {item.forced ? "forced" : "not forced"}
                  </p>
                ),
              },
            ]}
            ActionComponent={(item) => (
              <ActionButtons name="promoCode" id={item._id} />
            )}
          />
        </div>
      </div>
    </Suspense>
  );
}
