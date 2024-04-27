import CustomTable from "@/components/CustomTable";
import ActionButtons from "@/components/dashboard/ActionButtons";
import {
  addNewCollection,
  fetchCollections,
  removeCollection,
  updateCollection,
} from "@/lib/actions/store.actions";
import { Suspense } from "react";

export default async function OrdersPage() {
  const collections = await fetchCollections();

  return (
    <Suspense>
      <div className="flex flex-col gap-5 p-5 lg:p-20">
        <div className="flex flex-col gap-2">
          <CustomTable
            name="collection"
            inputObj={{
              image: "!image",
              name: "!text",
              url: "!text",
            }}
            data={collections}
            addAction={addNewCollection}
            editAction={updateCollection}
            removeAction={removeCollection}
            header={["image", "name", "url"]}
            ActionComponent={(item) => (
              <ActionButtons name="collection" id={item._id} />
            )}
          />
        </div>
      </div>
    </Suspense>
  );
}
