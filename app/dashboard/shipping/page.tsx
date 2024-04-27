import CustomTable from "@/components/CustomTable";
import ActionButtons from "@/components/dashboard/ActionButtons";

import {
  addNewCity,
  addNewGovernorate,
  fetchShipping,
  updateCity,
  updateGovernorate,
} from "@/lib/actions/shipping.actions";
import { Suspense } from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as {
    [key: string]: string;
  };

  const { governorate, cities } = await fetchShipping();

  let maxId = 0;
  cities.forEach((city) => {
    const cityId = parseInt(city.id);
    if (cityId > maxId) {
      maxId = cityId;
    }
  });

  return (
    <Suspense>
      <div className="flex flex-col gap-5 p-5 lg:p-20">
        <div className="flex flex-col gap-2">
          <CustomTable
            name="governorate"
            inputObj={{
              id: "!text",
              governorate_name_en: "!text",
              shipping_price: "!number",
            }}
            addAction={addNewGovernorate}
            editAction={updateGovernorate}
            data={governorate
              .filter((gov) =>
                gov.governorate_name_en
                  .toLowerCase()
                  .startsWith(searchValue?.toLowerCase() || ""),
              )
              .sort((a: any, b: any) => a.id - b.id)}
            header={["id", "governorate_name_en", "shipping_price"]}
            ActionComponent={(item) => (
              <ActionButtons name="governorate" id={item._id} />
            )}
          />
          <p>max id: {maxId}</p>
          <CustomTable
            name="city"
            inputObj={{
              id: "!text",
              governorate_id: "!text",
              city_name_en: "!text",
              shipping_price: "number",
            }}
            addAction={addNewCity}
            editAction={updateCity}
            data={cities
              .filter((city) =>
                city.city_name_en
                  .toLowerCase()
                  .startsWith(searchValue?.toLowerCase() || ""),
              )
              .sort((a: any, b: any) => a.governorate_id - b.governorate_id)}
            header={["city_name_en", "governorate_id", "shipping_price"]}
            ActionComponent={(item) => (
              <ActionButtons name="city" id={item._id} />
            )}
          />
        </div>
      </div>
    </Suspense>
  );
}
