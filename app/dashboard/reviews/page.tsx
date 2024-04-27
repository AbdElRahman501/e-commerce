import CustomTable from "@/components/CustomTable";
import ActionButtons from "@/components/dashboard/ActionButtons";
import {
  addNewReview,
  fetchReviews,
  removeReview,
  updateReview,
} from "@/lib/actions/store.actions";

import { Suspense } from "react";

export default async function OrdersPage() {
  const reviews = await fetchReviews({ limit: 10000 });

  return (
    <Suspense>
      <div className="flex flex-col gap-5 p-5 lg:p-20">
        <div className="flex flex-col gap-2">
          <CustomTable
            name="review"
            inputObj={{
              name: "!text",
              title: "!text",
              description: "!textArea",
              rating: "!number",
              images: "image",
            }}
            addAction={addNewReview}
            editAction={updateReview}
            removeAction={removeReview}
            data={reviews}
            header={["name", "title", "rating"]}
            ActionComponent={(item) => (
              <ActionButtons name="review" id={item._id} />
            )}
          />
        </div>
      </div>
    </Suspense>
  );
}
